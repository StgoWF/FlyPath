// server/models/User.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: false,
  toJSON: {
    virtuals: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.checkPassword = function (loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
};

const User = model('User', userSchema);

module.exports = User;
