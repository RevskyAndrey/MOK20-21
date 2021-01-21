const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');


const knex = new Knex(configKnex);
const timestamp = new Date();


async function createOrder(order) {
  const { username, from, to, status } = order;
}

async function getOrderByID(id){
  if (!id) {
    throw new Error('ERROR: no order id defined');
  }

  // const res = await knex
  //   .innerJoin('order_info', 'products.type_id', '=', 'types.id')
  //   .innerJoin('colors', 'products.color_id', '=', 'colors.id')
  //   .select('*')
  //   .from('products');
  // return res;
}


async function cancelOrder(id) {
  if (!id) {
    throw new Error('ERROR: no order id defined');
  }
  const res = await knex('orders').update({ status: 'cancel' }).return('*');
  return res;
}


module.exports = {
  createOrder, cancelOrder,getOrderByID
};