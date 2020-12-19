const { Knex } = require('knex');

const name = `Knex`;
// eslint-disable-next-line consistent-return
module.exports = (config) => {
  try {
    const knex = new Knex(config);

    return {
      testConnection: async () => {
        try {
          console.log(`INFO: DB ${name} test connection OK`);
          await knex.raw('SELECT NOW()');
        } catch (err) {
          console.error('ERROR: test connection failed', err.message || err);
          throw err;
        }
      },

      close: async () => {
        console.log(` INFO: Closing ${name} DB wraper`);
        // no close for knex
      },

      createProduct: async (product) => {
        try {
          if (!product.type) {
            throw new Error('ERROR: no product type defined');
          }
          if (!product.color) {
            throw new Error('ERROR: no product color defined');
          }
          const timestamp = new Date();
          const p = JSON.parse(JSON.stringify(product));
          delete p.id;
          p.price = p.price || 0;
          p.quantity = p.quantity || 1;
          p.created_at = timestamp;
          p.uprated_at = timestamp;

          const res = await knex('products').insert(p).returning('*');

          console.log(`Debug :New product created ${JSON.stringify(res[0])}`);
          return res[0];
        } catch (err) {
          console.error('create product failed', err.message || err);
          throw err;
        }
      },

      getProduct: async (id) => {
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
      },

      updateProduct: async (id, product) => {
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
      },

      deleteProduct: async (id) => {
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
      },

      getAllProduct: async () => {
        try {
          const res = await knex('products').whereNull('deleted_at');
          return res;
        } catch (err) {
          console.error('get  all product failed', err.message || err);
          throw err;
        }
      },

      getAllDeletedProduct: async () => {
        console.log('getAllDeletedProduct');
        try {
          const res = await knex('products').whereNotNull('deleted_at');
          return res;
        } catch (err) {
          console.error('get  all product failed', err.message || err);
          throw err;
        }
      },
    };
  } catch (err) {
    console.error(err.message || err);
  }
};
