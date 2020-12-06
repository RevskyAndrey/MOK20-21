const fs = require('fs');
const app = require('./server');
const { port, uploadDir, optimizedDir } = require('./config');

function checkCatalogs(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(dir);
  }
}

const boot = async () => {
  checkCatalogs(uploadDir);
  checkCatalogs(optimizedDir);
  app.listen(port, () => {
    console.log(` INFO : Express server started and listening at http://localhost:${port}`);
  });
};

boot();
