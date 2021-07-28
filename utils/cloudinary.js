const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudApiKey,
  api_secret: process.env.cloudApiSecret,
  secure: true,
});

module.exports = cloudinary;
