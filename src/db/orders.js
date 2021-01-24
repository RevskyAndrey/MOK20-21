/* eslint-disable camelcase */
const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);

async function createOrder({ user, from, to }) {
  try {
    const item = { user, from, to };
    const res = await knex('orders').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create order failed', err.message || err);
    throw err;
  }
}

async function createOrderInfo({ order_id, product_id, quantity, price }) {
  try {
    const item = { order_id, product_id, quantity, price };
    const res = await knex('order_info').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create order_info failed', err.message || err);
    throw err;
  }
}

async function getOrderByID(id) {
  if (!id) {
    throw new Error('ERROR: no order id defined');
  }

  const res = await knex('orders').select('*').where({ id });

  return res[0];
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
  createOrderInfo,
  cancelOrder,
  getOrderByID,
};
