const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);
const timestamp = new Date();

const { createTypeProduct } = require('./types');
const { createColorProduct } = require('./colors');

async function createProduct(product) {
  try {
    if (!product.type) {
      console.log('ERROR: No product type defined!');
      return { status: 'ERROR: No product type defined!' };
    }
    if (!product.color) {
      console.log('ERROR: No product color defined!');
      return { status: 'ERROR: No product color defined!' };
    }

    const p = JSON.parse(JSON.stringify(product));
    const type = await createTypeProduct(p.type);
    const color = await createColorProduct(p.color);
    delete p.id;
    delete p.type;
    delete p.color;
    p.price = p.price || 0;
    p.quantity = p.quantity || 1;
    p.created_at = timestamp;
    p.updated_at = timestamp;
    p.type_id = await type.id;
    p.color_id = await color.id;
    const res = await knex('products').insert(p).returning('*');

    // console.log(`Debug :New product created ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('create product failed', err.message || err);
    throw err;
  }
}

async function getProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await knex('products').where('id', id).whereNull('deleted_at');
    return res[0];
  } catch (err) {
    console.error('get product failed', err.message || err);
    throw err;
  }
}

async function updateProduct(id, product) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!Object.keys(product).length) {
      throw new Error('Error : Nothing to update');
    }
    product.updated_at = timestamp;
    const res = await knex('products').update(product).where('id', id).returning('*');
    // console.log(`Debug: product update ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('update product failed', err.message || err);
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    //  await knex('products').where('id', id).del();
    await knex('products').where('id', id).update('deleted_at', new Date());

    return true;
  } catch (err) {
    console.error('delete product failed', err.message || err);
    throw err;
  }
}

async function getAllProducts() {
  try {
    const res = await knex('products').whereNull('deleted_at');
    return res;
  } catch (err) {
    console.error('get  all product failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedProducts() {
  try {
    const res = await knex('products').whereNotNull('deleted_at');
    return res;
  } catch (err) {
    console.error('get  all deletes product failed', err.message || err);
    throw err;
  }
}

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllDeletedProducts,
};
