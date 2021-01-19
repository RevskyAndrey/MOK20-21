const Knex = require('knex');
const jwt = require('jsonwebtoken');
const {
  accessTokenSecret,
  db: { knex: configKnex },
} = require('../config');


const knex = new Knex(configKnex);
const timestamp = new Date();



async function createOrder(order) {
  const { username, from, to,status } = order;

}


module.exports = {
  createOrder,
};