const http = require('http');
const fs = require('fs');
const path = require('path');
const requestHandler = require('./utils/requestHandler');

const server = http.createServer(requestHandler);
const OptimizedDir = path.resolve(process.env.OPTIMIZED_DIR);
const uploadDir = path.resolve(process.env.UPLOAD_DIR);

function checkCatalogs(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(dir);
  }
}

function start() {
  const port = Number(process.env.PORT) || 3000;
  checkCatalogs(uploadDir);
  checkCatalogs(OptimizedDir);
  server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

function stop(callback) {
  server.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }

    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};
