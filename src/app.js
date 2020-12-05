const app = require('./server');
const { port } = require('./config');

const boot = async () => {
  app.listen(port, () => {
    console.log(` INFO : Express server started and listening at http://localhost:${port}`);
  });
};

boot();
