const express = require('express');
const {
  createOrders,
  getOrderById,
  getAllOrders,
  cancelingOrder,
  findCity,
  delivery,
} = require('../controllers/orders');

const orders = express.Router();

orders.post('/', (req, res) => {
  createOrders(req, res);
});

orders.get('/:id', (req, res) => {
  getOrderById(req, res);
});

orders.get('/', (req, res) => {
  getAllOrders();
  res.status(201).json({ status: 'get all' });
});

orders.post('/find-city/', (req, res) => {
  findCity(req, res);
});

orders.post('/delivery/:id', (req, res) => {
  delivery(req, res);
});

orders.post('/cansel/:id', (req, res) => {
  const { id } = req.params;
  cancelingOrder(id, res);
});

module.exports = orders;
