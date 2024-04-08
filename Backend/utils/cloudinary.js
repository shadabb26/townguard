const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name:process.env.CLOUDNAME,
  api_key:process.env.APIKEY,
  api_secret:process.env.APISECRET
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    // Upload file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    });

    // File has been uploaded Successfully, deleting from localStorage
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Remove the file from local path if upload operation failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;
