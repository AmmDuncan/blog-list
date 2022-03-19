const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id;

    delete returnedObj.passwordHash;
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongoose.model('User', userSchema);