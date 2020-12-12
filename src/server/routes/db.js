const express = require('express');
const { db: dbConfig } = require('../../config');
const db = require('../../db')(dbConfig);

const dbRouter = express.Router();

dbRouter.post('/create', (req, res) => {
  const { type, color, price, quantity } = req.query;
  const result = db.createProduct({ type, color, price, quantity });
  res.status(200).json(result);
});

// dbRouter.put('/update', (req, res) => {
//   const { id, type, color, price, quantity } = req.query;
//   console.log(req.params);
// });

dbRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.deleteProduct(id);
  res.status(202).json({ status: 'product deleted' });
});

dbRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = db.getProduct(id);
  result.then((resolve) => res.status(200).json(resolve));
});

dbRouter.get('/', (req, res) => {
  db.testConnection().then();
  res.status(200).json({ status: 'DB test connection OK ' });
});
module.exports = dbRouter;
