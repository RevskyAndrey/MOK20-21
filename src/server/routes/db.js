const express = require('express');
const db = require('../../db');
const { createTables } = require('../../db/knex/CreateTables');
const uploadToDb = require('../controllers/uploadtoDb');

const dbRouter = express.Router();

dbRouter.get('/deleted', (req, res) => {
  db.getAllDeletedProducts().then((resolve) => {
    console.log('db', resolve);
    res.status(200).json(resolve);
  });
});

dbRouter.put('/uploadCsv', (req, res) => {
  const result = uploadToDb(req);
  result.then((resolve) => {
    if (resolve) res.status(201).json({ status: 'file uploaded' });
  });
});

dbRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = db.getProduct(id);
  result.then((resolve) => res.status(200).json(resolve));
});

dbRouter.get('/', (req, res) => {
  db.getAllProducts().then((result) => {
    res.status(200).json(result);
  });
});

dbRouter.post('/create', (req, res) => {
  const { type, color, price, quantity } = req.query;
  db.createProduct({ type, color, price, quantity }).then((result) => res.status(200).json(result));
});

// localhost:3000/db/update/10?type=socks&color=red&price=55&quantity=5
dbRouter.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const data = req.query;
  db.updateProduct(id, data).then((result) => res.status(202).json(result));
});

dbRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.deleteProduct(id).then((result) => {
    if (result) res.status(202).json({ status: 'product deleted' });
  });
});

module.exports = dbRouter;
