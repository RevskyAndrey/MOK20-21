const app = require('..');

module.exports = () => {
  const exitHandler = (error) => {
    if (error) console.log(error);

    console.log('Gracefully shutdown...');
    app.stop(() => {
      process.exit();
    });
  };
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
};
