const mongoose = require('mongoose');
const { MEMBER_STATUS } = require('../constants');
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: Schema.Types.String,
  last_name: Schema.Types.String,
  email: Schema.Types.String,
  password: Schema.Types.String,
  status: {
    type: Schema.Types.String,
    enum: MEMBER_STATUS,
    default: 'member',
  },
});

module.exports = mongoose.model('User', userSchema);
