const fs = require('fs');
const path = require('path');

function checkOptimizedCatalogs() {
  const OptimizedDir = path.resolve(process.env.OPTIMIZED_DIR);
  try {
    fs.accessSync(OptimizedDir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(OptimizedDir);
  }
}

module.exports = async (fileName) => {
  const dir = path.resolve(process.env.UPLOAD_DIR);
  const listFiles = fs.readdirSync(dir);
  if (listFiles.length === 0) {
    response.end(JSON.stringify({ status: 'no files ' }));
  }
};
