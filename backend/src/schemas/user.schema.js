const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, // Asegurarse de que sea único y requerido
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profilePicture: { type: String },
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

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  const user = this;
  let data = {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  return jwt.sign(data, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

const User = model('user', userSchema);

module.exports = User;
