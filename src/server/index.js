const express = require('express');
const bodyParser = require('body-parser');
const {  uploads, db, dbType, dbColor, auth , orders} = require('./routes');
const authentificate = require('./middleware/auth');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/auth', auth);
app.use(authentificate);
app.use('/uploads', uploads);
app.use('/db/products/type', dbType);
app.use('/db/products/color', dbColor);
app.use('/db/products', db);
app.use('/api/orders', orders);


app.use((req, res, next) => {
  res.status(404).send('404 page not found check you URL and try again');
  next();
});

app.use(errorHandler);

module.exports = app;
