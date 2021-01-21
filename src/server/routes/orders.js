const express = require('express');
const { createOrders, getAllOrders, cancelingOrder,findCity } = require('../controllers/orders');


const orders = express.Router();

orders.post('/', (req, res) => {
  createOrders(req, res).then();
});

orders.get('/:id', (req, res) => {
  res.status(201).json({ status: 'get id' });
});
orders.get('/', (req, res) => {
  getAllOrders();
  res.status(201).json({ status: 'get all' });
});

orders.post('/find-city/', (req, res) => {
  findCity(req,res)
});


orders.post('/cansel/:id', (req, res) => {
  const { id } = req.params;
  cancelingOrder(id)
});


module.exports = orders;
