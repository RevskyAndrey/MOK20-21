const express = require('express');
const bodyParser = require('body-parser');
const { task1, task2, task3, discount, uploads, db, dbType, dbColor, auth } = require('./routes');
const authentificate = require('./middleware/auth');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', auth);
app.use(authentificate);
app.use('/uploads', uploads);
app.use('/task1', task1);
app.use('/task2', task2);
app.use('/task3', task3);
app.use('/products', discount);
app.use('/db/products/type', dbType);
app.use('/db/products/color', dbColor);
app.use('/db/products', db);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res, next) => {
  res.status(404).send('404 page not found check you URL and try again');
  next();
});

app.use(errorHandler);

module.exports = app;
