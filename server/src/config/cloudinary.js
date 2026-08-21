const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file either to Cloudinary or return local path fallback
 */
const uploadToCloudinary = async (filePath, folder = 'ventureconnect') => {
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'demo_cloud') {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto',
      });
      // Delete temp local file after successful upload
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      // Local fallback mode
      const filename = path.basename(filePath);
      return {
        url: `/uploads/${filename}`,
        publicId: `local_${filename}`,
      };
    }
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    const filename = path.basename(filePath);
    return {
      url: `/uploads/${filename}`,
      publicId: `local_${filename}`,
    };
  }
};

module.exports = { cloudinary, uploadToCloudinary };
