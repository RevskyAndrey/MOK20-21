const fs = require('fs');

const { uploadDir } = require('../../config');

const optimizeJson = require('../utils/optimizeJson');

function optimizeJSON(fileName, res) {
  const listFiles = fs.readdirSync(uploadDir);
  const result = listFiles.includes(fileName);

  if (result) {
    optimizeJson(fileName);
    res.status(200).json({ status: `starting optimization filename ${fileName} ` });
    return;
  }
  res.json({ status: `not found filename ${fileName}` });
}

module.exports = {
  optimizeJSON,
};
