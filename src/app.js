const fs = require('fs');
const app = require('./server');
const { port, uploadDir, optimizedDir, db: dbConfig } = require('./config');
const autoOptimize = require('./server/utils/moduleAuto');
const gracefulShutdown = require('./server/utils/gracefulShutdown');

const db = require('./db')(dbConfig);

function checkCatalogs(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(dir);
  }
}

const boot = async () => {
  try {
    // checkCatalogs(uploadDir);
    // checkCatalogs(optimizedDir);
    // autoOptimize();
    app.listen(port, () => {
      console.log(`INFO: Express server started and listening at http://localhost:${port}`);
    });
    await db.testConnection();
  } catch (err) {
    console.error(err.message || err);
  }
};

boot();
gracefulShutdown(error);