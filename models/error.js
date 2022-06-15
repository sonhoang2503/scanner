const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  status: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const ErrorUrl = mongoose.model('UrlsError', ErrorSchema);
module.exports = ErrorUrl;
