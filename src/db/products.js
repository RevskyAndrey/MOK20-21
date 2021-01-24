const Knex = require('knex');
const {
  db: { knex: configKnex },
} = require('../config');

const knex = new Knex(configKnex);
const timestamp = new Date();

const { getTypeProductTypename } = require('./types');
const { getColorProductColorname } = require('./colors');

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
    if (!product.weight) {
      console.log('ERROR: No product weight defined!');
      return { status: 'ERROR: No product weight defined!' };
    }
    const p = JSON.parse(JSON.stringify(product));
    const type = await getTypeProductTypename(p.type);
    const color = await getColorProductColorname(p.color);

    if (!color || !type) {
      console.log('Error: this color or type is not indicated in the tables');
      // eslint-disable-next-line consistent-return
      return;
    }

    delete p.id;
    delete p.type;
    delete p.color;
    p.price = p.price || 0;
    p.weight = p.weight || 0;
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

async function findProduct(product) {
  try {
    if (!product.type || !product.color || !product.price) {
      console.log('ERROR: No product  defined!');
      return { status: 'ERROR: No product weight defined!' };
    }

    const p = JSON.parse(JSON.stringify(product));
    const type = await getTypeProductTypename(p.type);
    const color = await getColorProductColorname(p.color);

    const res = await knex('products')
      .select('*')
      .where('type_id', `${type.id}`)
      .andWhere('color_id', `${color.id}`)
      .andWhere('price', product.price)
      .returning('*');
    res[0].type = p.type;
    res[0].color = p.color;
    return res[0];
  } catch (err) {
    console.error('find product failed', err.message || err);
    throw err;
  }
}

async function getProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await knex
      .innerJoin('types', 'products.type_id', '=', 'types.id')
      .innerJoin('colors', 'products.color_id', '=', 'colors.id')
      .select('*')
      .from('products')
      .where('products.id', id);
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

async function updateProductQuantity(id, quantity) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!quantity) {
      throw new Error('Error : Nothing to update');
    }
    const res = await knex('products').update({ quantity }).where({ id }).returning('*');
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
    const res = await knex
      .innerJoin('types', 'products.type_id', '=', 'types.id')
      .innerJoin('colors', 'products.color_id', '=', 'colors.id')
      .select('*')
      .from('products');
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
  findProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllDeletedProducts,
  updateProductQuantity,
};
