const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config');

const db = require('../../db');

const api = require('../../lib/api');

async function getUsernameFromToken(req) {
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) throw new Error('Token expired!');
    req.user = user;
    return user.username;
  });
}

async function createOrders(req, res) {
  const username = await getUsernameFromToken(req);
  const user = await db.findOneUser(username);
  res.status(201).json({ status: user });
}

async function getOrderById(req, res) {
  const { id } = req.params;
  db.getOrderByID(id);
  res.status(200).json({ status: ' id orders' });
}

async function getAllOrders(req, res) {
  res.status(200).json({ status: ' all orders' });
}

async function findCity(req, res) {
  const { from, to } = req.body;
  const fromId = await api.searchSettlements(from);
  const toId = await api.searchSettlements(to);
  const result = { fromId, toId };
  res.status(200).json(result);
}

async function delivery(req, res) {
  const { id } = req.params;

  const result = id;
  res.status(200).json(result);
}

// async function cancelingOrder(id, query) {
//   // check order
//   // update status
//   // return quantity
// }

module.exports = { createOrders, getOrderById, getAllOrders, findCity, delivery };
