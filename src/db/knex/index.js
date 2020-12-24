const Knex = require('knex');
const {
  db: {
    config: { knex: configKnex },
  },
} = require('../../config');

const knex = new Knex(configKnex);
const name = 'knex';
const timestamp = new Date();

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

async function createType(type) {
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

async function createColor(color) {
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

async function createProduct(product) {
  try {
    if (!product.type) {
      throw new Error('ERROR: No product type defined!');
    }
    if (!product.color) {
      throw new Error('ERROR: No product color defined!');
    }
    const p = JSON.parse(JSON.stringify(product));
    const type = await createType(p.type);
    const color = await createColor(p.color);
    delete p.id;
    delete p.type;
    delete p.color;
    p.price = p.price || 0;
    p.quantity = p.quantity || 1;
    p.created_at = timestamp;
    p.updated_at = timestamp;
    p.type_id = type.id;
    p.color_id = color.id;
    const res = await knex('products').insert(p).returning('*');

    console.log(`Debug :New product created ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('create product failed', err.message || err);
    throw err;
  }
}

async function getTypeProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await knex('types').where('id', id).whereNull('deleted_at');

    return res[0];
  } catch (err) {
    console.error('get type failed', err.message || err);
    throw err;
  }
}

async function getColorProduct(id) {
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

async function updateColorProduct(id, color) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!color) {
      throw new Error('Error : Nothing to update');
    }

    const res = await knex('colors').update(color).where('id', id).returning('*');
    console.log(`Debug: product update ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('updateColorProduct failed', err.message || err);
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

async function getAllTypesProducts() {
  try {
    const res = await knex('types').whereNull('deleted_at');
    return res;
  } catch (err) {
    console.error('getAllTypesProducts failed', err.message || err);
    throw err;
  }
}
async function getAllcolorsProducts() {
  try {
    const res = await knex('products').whereNull('deleted_at');
    return res;
  } catch (err) {
    console.error('get All colors Products failed', err.message || err);
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

async function getAllDeletedTypesProducts() {
  try {
    const res = await knex('types').whereNotNull('deleted_at');
    return res;
  } catch (err) {
    console.error('getAllDeletedTypesProducts failed', err.message || err);
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
async function getAllDeletedProducts() {
  try {
    const res = await knex('products').whereNotNull('deleted_at');
    return res;
  } catch (err) {
    console.error('get  all deletes product failed', err.message || err);
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
    //---
    getTypeProduct,
    getColorProduct,
    updateTypeProduct,
    updateColorProduct,
    deleteTypeProduct,
    deleteColorProduct,
    getAllTypesProducts,
    getAllcolorsProducts,
    getAllDeletedTypesProducts,
    getAllDeletedColorsProducts,
  };
};
