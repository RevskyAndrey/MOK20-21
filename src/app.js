require('dotenv').config();
const server = require('./server');
const autoOptimize = require('./server/utils/moduleAuto');

function gracefulShutdown() {
  const exitHandler = (error) => {
    if (error) console.log(error);

    console.log('Gracefully shutdown...');
    server.stop(() => {
      process.exit();
    });
  };
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

function boot() {
  gracefulShutdown();
  server.start();
  autoOptimize();
}

boot();
