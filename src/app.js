const fs = require('fs');
const app = require('./server');
const { port, uploadDir, optimizedDir } = require('./config');
const autoOptimize = require('./server/utils/moduleAuto');

function checkCatalogs(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(dir);
  }
}

function boot() {
  checkCatalogs(uploadDir);
  checkCatalogs(optimizedDir);
  autoOptimize();
  app.listen(port, () => {
    console.log(`INFO : Express server started and listening at http://localhost:${port}`);
  });
}

boot();
