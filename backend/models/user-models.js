const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next){
  try{
    if (this.isNew){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password,salt);
      this.password = hashedPassword;
    }
    next();
  } catch (err){
    next(err);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
}


const User = mongoose.model('User', userSchema);

module.exports = User;