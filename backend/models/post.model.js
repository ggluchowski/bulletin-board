const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  publicDate: { type: Date, required: true },
  modDate: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phoneNumber: { type: String },
  localization: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
