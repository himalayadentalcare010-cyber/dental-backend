const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dnls1qluc",
  api_key: process.env.CLOUDINARY_API_KEY || "454942565345162",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "E08pYu72KBF0jbZpzLiZY2Lh3_g",
});

module.exports = cloudinary;
