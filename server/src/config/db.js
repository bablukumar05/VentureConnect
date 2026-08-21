const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ventureconnect');
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn(`[Warning]: Database connection failed. Ensure MongoDB is running locally or check MONGODB_URI in .env.`);
    // Note: We don't force process.exit(1) so backend can still serve fallback status if needed.
  }
};

module.exports = connectDB;
