const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    message: String,
    path: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Log', logSchema);
