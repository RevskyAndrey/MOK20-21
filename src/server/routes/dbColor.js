const express = require('express');
const db = require('../../db');

const dbTypeRouter = express.Router();

dbTypeRouter.get('/deleted', (req, res) => {
  db.getAllDeletedColorsProducts().then((resolve) => {
    console.log('db', resolve);
    res.status(200).json(resolve);
  });
});

dbTypeRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = db.getColorProductId(id);
  result.then((resolve) => res.status(200).json(resolve));
});

dbTypeRouter.get('/typename', (req, res) => {
  const { color } = req.query;
  const result = db.getColorProductColorname(color);
  result.then((resolve) => res.status(200).json(resolve));
});

dbTypeRouter.get('/', (req, res) => {
  db.getAllcolorsProducts().then((result) => {
    res.status(200).json(result);
  });
});

dbTypeRouter.post('/create', (req, res) => {
  const { color } = req.query;
  db.createColorProduct(color).then((result) => res.status(200).json(result));
});

// localhost:3000/db/update/10?type=socks&color=red&price=55&quantity=5
dbTypeRouter.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { color } = req.query;
  db.updateColorProduct(id, color).then((result) => res.status(202).json(result));
});

dbTypeRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.deleteColorProduct(id).then((result) => {
    if (result) res.status(202).json({ status: 'product  color  deleted' });
  });
});

module.exports = dbTypeRouter;
