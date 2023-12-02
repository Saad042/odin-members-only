const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  title: Schema.Types.String,
  timestamp: { type: Schema.Types.Number, default: Date.now() },
  text: Schema.Types.Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', messageSchema);
