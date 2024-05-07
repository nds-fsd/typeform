const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  createdAt: { type: Date },
});

const User = model('user', userSchema);

module.exports = User;
