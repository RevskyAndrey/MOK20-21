const express = require('express');
const bodyParser = require('body-parser');
// const autoOptimize = require('./server/utils/moduleAuto');
const app = express();

const { task1, task2, task3, discount, uploads } = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/task1', task1);
app.use('/task2', task2);
app.use('/task3', task3);
app.use('/products', discount);
app.use('/uploads', uploads);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = app;
