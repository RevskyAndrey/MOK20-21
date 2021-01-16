const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);
const timestamp = new Date();

async function createColorProduct(color) {
  try {
    const item = {};
    item.color = color;
    item.created_at = timestamp;
    item.updated_at = timestamp;
    const res = await knex('colors').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create color failed', err.message || err);
    throw err;
  }
}

async function getColorProductId(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await knex('colors').where('id', id).whereNull('deleted_at');

    return res[0];
  } catch (err) {
    console.error('get color failed', err.message || err);
    throw err;
  }
}

async function getColorProductColorname(colorname) {
  try {
    if (!colorname) {
      throw new Error('ERROR: no product color name defined');
    }
    const res = await knex('colors').where('color', colorname).whereNull('deleted_at');

    return res[0];
  } catch (err) {
    console.error('get color failed', err.message || err);
    throw err;
  }
}

async function updateColorProduct(id, color) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!color) {
      throw new Error('Error : Nothing to update');
    }
    color.updated_at = timestamp;
    const res = await knex('colors').update(color).where('id', id).returning('*');
    console.log(`Debug: product update ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('updateColorProduct failed', err.message || err);
    throw err;
  }
}

async function deleteColorProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    //  await knex('colors').where('id', id).del();
    await knex('colors').where('id', id).update('deleted_at', new Date());

    return true;
  } catch (err) {
    console.error('deleteColorProduct failed', err.message || err);
    throw err;
  }
}

async function getAllcolorsProducts() {
  try {
    const res = await knex('colors').whereNull('deleted_at');
    return res;
  } catch (err) {
    console.error('get All colors Products failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedColorsProducts() {
  try {
    const res = await knex('colors').whereNotNull('deleted_at');
    return res;
  } catch (err) {
    console.error('getAllDeletedColorsProducts failed', err.message || err);
    throw err;
  }
}

module.exports = {
  createColorProduct,
  getColorProductId,
  getColorProductColorname,
  updateColorProduct,
  deleteColorProduct,
  getAllcolorsProducts,
  getAllDeletedColorsProducts,
};
