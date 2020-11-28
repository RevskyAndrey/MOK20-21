const http = require('http');
const requestHandler = require('./utils/requestHandler');

const server = http.createServer(requestHandler);

function start() {
  const port = Number(process.env.PORT) || 3000;
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
