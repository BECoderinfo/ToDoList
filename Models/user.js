const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password :{
    type: String
  },
  profileImage: {
    type: String
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
