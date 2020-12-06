const fs = require('fs');
const optimizeJson = require('./optimizeJson');

module.exports = () => {
  const time = process.env.AUTO_OPTIMIZE_TIME;
  const dir = process.env.UPLOAD_DIR;
  setInterval(() => {
    console.log(`AUTO OPTIMIZE : Starter checking folder ${dir} to optimize files`);
    const uploadFiles = fs.readdirSync(dir);
    const result = [...uploadFiles].filter((item) => item !== 'optimized');
    if (result.length !== 0) {
      for (let i = 0; i < result.length; i++) {
        const fileName = result[i];
        optimizeJson(fileName);
      }
    } else console.log(`AUTO OPTIMIZE : no files to optimized `);
  }, time);
};
