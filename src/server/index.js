const http = require('http');
const express = require('express');
const requestHandler = require('./utils/requestHandler');
// const autoOptimize = require('./server/utils/moduleAuto');
const server = http.createServer(requestHandler);

const app = express();

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
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
