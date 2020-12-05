const app = require('./server');
const { port } = require('./config');

app.listen(port, () => {
  console.log(` INFO : Express server started and listening at http://localhost:${port}`);
});

//
//
//
// function boot() {
//   gracefulShutdown();
//   server.start();
//   autoOptimize();
// }

// boot();
