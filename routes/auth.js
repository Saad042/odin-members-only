var express = require('express');
const passport = require('passport');
const auth_handler = require('../handlers/authHandlers');

var router = express.Router();

passport.use(auth_handler.authenticate);

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

router.get('/sign-up', function (req, res, next) {
  res.render('sign-up');
});

router.post('/sign-up', auth_handler.create_user);

module.exports = router;
