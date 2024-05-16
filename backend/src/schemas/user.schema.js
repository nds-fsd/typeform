require('dotenv').config();
const { Schema, model } = require('mongoose');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  createdAt: { type: Date },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.generateJWT = function () {
  const user = this;
  let data = {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  return jwt.sign(data, secret);
};

const User = model('user', userSchema);

module.exports = User;
