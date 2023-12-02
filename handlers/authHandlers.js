const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.authenticate = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ first_name: username });
    if (!user) {
      return done(null, false, { message: 'Incorrect first_name' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

exports.create_user = async function (req, res, next) {
  try {
    const saltRounds = 10;
    const { first_name, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      first_name,
      password: hasedPassword,
    });
    const result = await user.save();
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } catch (err) {
    return next(err);
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
