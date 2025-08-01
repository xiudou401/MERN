const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  if (!validator.isEmail) {
    throw new Error('Email is not valid');
  }

  if (!validator.isStrongPassword) {
    throw new Error('password is not strong');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('email in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('incorrect password');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
