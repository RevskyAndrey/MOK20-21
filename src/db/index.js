const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);
const name = 'knex';

const {
  createTypeProduct,
  getTypeProductId,
  getTypeProductTypename,
  updateTypeProduct,
  deleteTypeProduct,
  getAllTypesProducts,
  getAllDeletedTypesProducts,
} = require('./types');

const {
  createColorProduct,
  getColorProductId,
  getColorProductColorname,
  updateColorProduct,
  deleteColorProduct,
  getAllcolorsProducts,
  getAllDeletedColorsProducts,
} = require('./colors');

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllDeletedProducts,
} = require('./products');

const { createUser, updateUser, deleteUser, findOneUser } = require('./users');

async function testConnection() {
  try {
    console.log(`INFO: DB ${name} test connection OK`);
    await knex.raw('SELECT NOW()');
  } catch (err) {
    console.error('ERROR: test connection failed', err.message || err);
    throw err;
  }
}

async function close() {
  console.log(` INFO: Closing ${name} DB wraper`);
  // no close for knex
}

module.exports = {
  testConnection,
  close,
  //--
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllDeletedProducts,
  //---
  createTypeProduct,
  getTypeProductId,
  getTypeProductTypename,
  updateTypeProduct,
  deleteTypeProduct,
  getAllTypesProducts,
  getAllDeletedTypesProducts,
  //---
  createColorProduct,
  getColorProductId,
  getColorProductColorname,
  updateColorProduct,
  deleteColorProduct,
  getAllcolorsProducts,
  getAllDeletedColorsProducts,
  //---
  createUser,
  updateUser,
  deleteUser,
  findOneUser,
};
