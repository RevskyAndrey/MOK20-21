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

/*
{ "from" : "e71fe3ca-4b33-11e4-ab6d-005056801329" ,
    "to" :"e718a680-4b33-11e4-ab6d-005056801329" ,
     "product" :  {
     "type" : "socks",
     "color": "red",
     "quantity" : 3,
     "price" : 2
       }
    }
*/

async function createOrders(req, res) {
  try {
    const { body: data } = req;
    if (
      !data.from ||
      !data.to ||
      !data.product ||
      !data.product.type ||
      !data.product.color ||
      !data.product.quantity ||
      !data.product.price
    ) {
      res.status(400).send({ status: 'bad request' });
    } else {
      const username = await getUsernameFromToken(req);
      const user = await db.findOneUser(username);
      const { from, to, product } = data;
      const foundProduct = await db.findProduct(product);
      if (foundProduct.id && foundProduct.quantity >= data.product.quantity) {
        const order = await db.createOrder(user.id, from, to, foundProduct);
        const quantity = foundProduct.quantity - data.product.quantity;
        await db.updateProductQuantity(foundProduct.id, quantity);
        res.status(201).json({ order });
      } else {
        res.status(400).json({ status: 'Bad Request' });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function getOrderById(req, res) {
  const { id } = req.params;
  const idNum = id.trim();
  db.getOrderByID(idNum).then((resolve) => res.status(200).json(resolve));
}

async function getAllOrders(req, res) {
  db.getAllOrders().then((resolve) => {
    console.log(resolve);
    res.status(200).json(resolve);
  });
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
