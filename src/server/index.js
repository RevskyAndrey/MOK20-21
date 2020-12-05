const express = require('express');
// const requestHandler = require('./utils/requestHandler');
// const autoOptimize = require('./server/utils/moduleAuto');

const app = express();

const task2 = require('./routes/task2');

app.use('/task2', task2);
app.get('/', (req, res) => {
  res.send('Home');
});

module.exports = app;
