/* eslint-disable camelcase */
const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);

async function createOrder(user, from, to, product) {
  try {
    const item = { user, from, to };
    item.product_id = product.id;
    item.quantity = product.quantity;
    item.price = product.price;
    item.weight = product.weight;
    console.log(item);
    const res = await knex('orders').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create order failed', err.message || err);
    throw err;
  }
}

async function getOrderByID(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no order id defined');
    }
    const res = await knex('orders').select('*').where({ id });
    return res[0];
  } catch (err) {
    console.error('get  order failed', err.message || err);
    throw err;
  }
}

async function getAllOrders() {
  try {
    return await knex('orders').select('*');
  } catch (err) {
    console.error('get all order failed', err.message || err);
    throw err;
  }
}

async function cancelOrder(id) {
  if (!id) {
    throw new Error('ERROR: no order id defined');
  }
  const res = await knex('orders').update({ status: 'cancel' }).return('*');
  return res;
}

module.exports = {
  createOrder,
  cancelOrder,
  getOrderByID,
  getAllOrders,
};
