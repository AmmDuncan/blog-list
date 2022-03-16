const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

UserSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id;

    delete returnedObj.passwordHash;
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongoose.model('User', UserSchema);