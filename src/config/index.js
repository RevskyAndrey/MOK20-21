require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  origin: process.env.ORIGIN || 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR || './uploads/',
  optimizedDir: process.env.OPTIMIZED_DIR || './uploads/optimized/',
  autoOptimizeTime: process.env.AUTO_OPTIMIZE_TIME || 1800000,
  user: {
    name: 'Masters',
    password: 'Academy',
  },
};
