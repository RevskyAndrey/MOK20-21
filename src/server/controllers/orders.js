const jwt = require('jsonwebtoken');
const {
  accessTokenSecret,
  db: { knex: configKnex },
} = require('../../config');

const db = require('../../db');

async function getUsernameFromToken(req) {
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) throw new Error('Token expired!');
    req.user = user;
    return user.username;
  });
}


async function createOrders(req, res) {
  const user = await getUsernameFromToken(req);
  res.status(201).json({ status: user });
}

async function getAllOrders(req,res){
  res.status(200).json({status: " all orders"})
}


async function cancelingOrder(id, query) {
  // check order
  // update status
  //return quantity
}


module.exports = { createOrders, getAllOrders,cancelingOrder };