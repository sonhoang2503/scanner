const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  // Check if password is modified
  if (!this.isModified('password')) return next();
  // Hash new password
  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.comparePassword = async (
  loginPassword,
  hashedPasswordDB
) => {
  return await bcrypt.compare(loginPassword, hashedPasswordDB);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
