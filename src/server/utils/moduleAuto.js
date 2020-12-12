const fs = require('fs');
const optimizeJson = require('./optimizeJson');
const { uploadDir, autoOptimizeTime } = require('../../config');

module.exports = () => {
  setInterval(() => {
    console.log(`AUTO OPTIMIZE : Starter checking folder ${uploadDir} to optimize files`);
    const uploadFiles = fs.readdirSync(uploadDir);
    const result = [...uploadFiles].filter((item) => item !== 'optimized');
    if (result.length !== 0) {
      for (let i = 0; i < result.length; i++) {
        const fileName = result[i];
        optimizeJson(fileName);
      }
    } else console.log(` AUTO OPTIMIZE : no files to optimized `);
  }, autoOptimizeTime);
};
