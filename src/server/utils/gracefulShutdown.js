const db = require('../../db');

module.exports = () => {
  const exitHandler = (error) => {
    if (error) console.log(error);
    console.log('Gracefully shutdown...');
    db.end();
    process.exit();
  };
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
};
