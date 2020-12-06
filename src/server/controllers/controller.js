const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, '../', 'goods.json');
const optimizeJson = require('../utils/optimizeJson');

// POST  127.0.0.1:3000/changeJSON
function changeJSON(data, response) {
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 1));
  response.write('Post result = ');
  response.end(JSON.stringify(data));
}

function optimizeJSON(response, fileName) {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR);
  const listFiles = fs.readdirSync(uploadDir);
  const result = listFiles.includes(fileName);
  if (result) {
    optimizeJson(fileName);
    response.statusCode = 202;
    response.end(JSON.stringify(`starting optimization filename ${fileName} `));
    return;
  }
  response.end(JSON.stringify(` not found filename ${fileName}`));
}

module.exports = {
  changeJSON,
  optimizeJSON,
};
