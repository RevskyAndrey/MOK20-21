const Knex = require('knex');
const {
  db: {
    config: { knex: configKnex },
  },
} = require('../../config');

const knex = new Knex(configKnex);
const name = 'knex';
const timestamp = new Date();

async function createTypeProduct(type) {
  try {
    const item = {};
    item.type = type;
    item.created_at = timestamp;
    item.updated_at = timestamp;
    const res = await knex('types').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create type failed', err.message || err);
    throw err;
  }
}

async function getTypeProductId(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await knex('types').where('id', id).whereNull('deleted_at');

    return res[0];
  } catch (err) {
    console.error('get type  failed', err.message || err);
    throw err;
  }
}

async function getTypeProductTypename(typename) {
  try {
    if (!typename) {
      throw new Error('ERROR: no product Typename defined');
    }
    const res = await knex('types').where('type', typename).whereNull('deleted_at');

    return res[0];
  } catch (err) {
    console.error('get type name failed', err.message || err);
    throw err;
  }
}

async function updateTypeProduct(id, type) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!type) {
      throw new Error('Error : Nothing to update');
    }

    const res = await knex('types').update(type).where('id', id).returning('*');
    console.log(`Debug: product update ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('updateTypeProduct failed', err.message || err);
    throw err;
  }
}

async function deleteTypeProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    //  await knex('types').where('id', id).del();
    await knex('types').where('id', id).update('deleted_at', new Date());

    return true;
  } catch (err) {
    console.error('deleteTypeProduct failed', err.message || err);
    throw err;
  }
}

async function getAllTypesProducts() {
  try {
    const res = await knex('types').whereNull('deleted_at');
    return res;
  } catch (err) {
    console.error('getAllTypesProducts failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedTypesProducts() {
  try {
    const res = await knex('types').whereNotNull('deleted_at');
    return res;
  } catch (err) {
    console.error('getAllDeletedTypesProducts failed', err.message || err);
    throw err;
  }
}

module.exports = {
    createTypeProduct,
    getTypeProductId,
    getTypeProductTypename,
    updateTypeProduct,
    deleteTypeProduct,
    getAllTypesProducts,
    getAllDeletedTypesProducts
}