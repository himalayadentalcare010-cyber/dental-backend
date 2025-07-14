const cloudinary = require('cloudinary').v2;cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dj3uudzl3',
  api_key: process.env.CLOUDINARY_API_KEY || '954562388357852',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'u7Kbe3OUW18Q5bAoE4KthNYlEjo',
});

module.exports = cloudinary;
