const fs = require('fs');
const path = require('path');

const OptimizedDir = path.resolve(process.env.OPTIMIZED_DIR);

function checkOptimizedCatalogs() {
  try {
    fs.accessSync(OptimizedDir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(OptimizedDir);
  }
}

module.exports = async (fileName) => {
  checkOptimizedCatalogs();
  const readStream = fs.createReadStream(fileName);
};
