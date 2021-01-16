const fs = require('fs');
const app = require('./server');
const { port, uploadDir, optimizedDir } = require('./config');
const autoOptimize = require('./server/utils/moduleAuto');
const gracefulShutdown = require('./server/utils/gracefulShutdown');

const db = require('./db');

function checkCatalogs(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(dir);
  }
}

const boot = async () => {
  try {
    checkCatalogs(uploadDir);
    checkCatalogs(optimizedDir);
    autoOptimize();
    await db.testConnection();
    app.listen(port, () => {
      console.log(`INFO: Express server started and listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err.message || err);
  }
};
gracefulShutdown();
boot();
