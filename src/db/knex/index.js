const Knex = require('knex');
const {
  db: {
    config: { knex: configKnex },
  },
} = require('../../config');

const knex = new Knex(configKnex);
const name = 'knex';
const tablets = ['products', 'colors', 'types'];

async function removeTablet(tabletName) {
  try {
    await knex.schema.dropTable(tabletName);
  } catch (err) {
    console.error('removeTablet failed', err.message || err);
    throw err;
  }
}

async function removeAllTablets() {
  try {
    tablets.forEach((item) => removeTablet(item));
  } catch (err) {
    console.error(`remove All Tablets failed`, err.message || err);
    throw err;
  }
}

async function createTablesDb() {
  try {
    removeAllTablets();
  } catch (err) {
    console.error('createTablesDb failed', err.message || err);
    throw err;
  }
}

async function testConnection() {
  try {
    console.log(`INFO: DB ${name} test connection OK`);
    await knex.raw('SELECT NOW()');
    await createTablesDb();
  } catch (err) {
    console.error('ERROR: test connection failed', err.message || err);
    throw err;
  }
}

async function close() {
  console.log(` INFO: Closing ${name} DB wraper`);
  // no close for knex
}

async function createProduct(product) {
  try {
    if (!product.type) {
      throw new Error('ERROR: No product type defined!');
    }
    if (!product.color) {
      throw new Error('ERROR: No product color defined!');
    }
    const p = JSON.parse(JSON.stringify(product));
    const timestamp = new Date();

    delete p.id;
    p.price = p.price || 0;
    p.quantity = p.quantity || 0;
    p.created_at = timestamp;
    p.updated_at = timestamp;

    const res = await knex('products').insert(p).returning('*');

    console.log(`Debug :New product created ${JSON.stringify(res[0])}`);
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

    const res = await knex('products').update(product).where('id', id).returning('*');
    console.log(`Debug: product update ${JSON.stringify(res[0])}`);
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
    console.error('get  all product failed', err.message || err);
    throw err;
  }
}

module.exports = () => {
  return {
    testConnection,
    close,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllDeletedProducts,
  };
};
