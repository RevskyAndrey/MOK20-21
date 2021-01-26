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
  getAllOrders(req, res);
});

orders.post('/find-city/', (req, res) => {
  findCity(req, res);
});

orders.post('/delivery/:id', (req, res) => {
  delivery(req, res);
});

orders.post('/cancel/:id', (req, res) => {
  cancelingOrder(req, res);
});

module.exports = orders;
