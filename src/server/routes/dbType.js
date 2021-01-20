const express = require('express');
const db = require('../../db');

const dbTypeRouter = express.Router();

dbTypeRouter.get('/deleted', (req, res) => {
  db.getAllDeletedTypesProducts().then((resolve) => {
    console.log('db', resolve);
    res.status(200).json(resolve);
  });
});

dbTypeRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = db.getTypeProductId(id);
  result.then((resolve) => res.status(200).json(resolve));
});

dbTypeRouter.get('/typename', (req, res) => {
  const { type } = req.query;
  const result = db.getTypeProductTypename(type);
  result.then((resolve) => res.status(200).json(resolve));
});

dbTypeRouter.get('/', (req, res) => {
  db.getAllTypesProducts().then((result) => {
    res.status(200).json(result);
  });
});

dbTypeRouter.post('/create', (req, res) => {
  const { type } = req.query;
  db.createTypeProduct(type).then((result) => res.status(200).json(result));
});

// localhost:3000/db/update/10?type=socks&color=red&price=55&quantity=5
dbTypeRouter.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  db.updateTypeProduct(id, type).then((result) => res.status(202).json(result));
});

dbTypeRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.deleteTypeProduct(id).then((result) => {
    if (result) res.status(202).json({ status: 'product  type deleted' });
  });
});

module.exports = dbTypeRouter;
