const express = require('express');
// const requestHandler = require('./utils/requestHandler');
// const autoOptimize = require('./server/utils/moduleAuto');
const app = express();

const task1 = require('./routes/task1');
const task2 = require('./routes/task2');
const task3 = require('./routes/task3');
const discount = require('./routes/discount');

app.get('/', (req, res) => {
  res.send('Home');
});
app.use('/task1', task1);
app.use('/task2', task2);
app.use('/task3', task3);
app.use('/products', discount);

module.exports = app;
