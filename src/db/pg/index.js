const { Pool } = require('pg');

const name = `postgres`;
// eslint-disable-next-line consistent-return
module.exports = (config) => {
  try {
    const client = new Pool(config);

    return {
      getAllDeletedProduct: async () => {
        console.log('getAllDeletedProduct');
        try {
          const res = await client.query(`SELECT * FROM products WHERE "deleted_at" IS NOT NULL`);
          return res.rows;
        } catch (err) {
          console.error('get  all product failed', err.message || err);
          throw err;
        }
      },

      testConnection: async () => {
        try {
          console.log(`INFO: DB ${name} test connection OK`);
          await client.query('SELECT NOW()');
        } catch (err) {
          console.error('ERROR: test connection failed', err.message || err);
          throw err;
        }
      },

      close: async () => {
        console.log(` INFO: Closing ${name} DB wraper`);
        // eslint-disable-next-line no-unused-expressions
        client.end;
      },

      createProduct: async ({ type, color, price = 0, quantity = 1 }) => {
        try {
          if (!type) {
            throw new Error('ERROR: no product type defined');
          }
          if (!color) {
            throw new Error('ERROR: no product color defined');
          }
          const timestamp = new Date();
          console.log(type, color, price, quantity);
          const res = await client.query(
            'INSERT INTO products(type, color, price, quantity, created_at, uprated_at, deleted_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [type, color, price, quantity, timestamp, timestamp, null],
          );

          console.log(`Debug :New product created ${JSON.stringify(res.rows[0])}`);
          return res.rows[0];
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
          const res = await client.query(
            'SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL',
            [id],
          );
          return res.rows[0];
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
          const query = [];
          const values = [];

          // eslint-disable-next-line no-restricted-syntax
          for (const [i, [k, v]] of Object.entries(product).entries()) {
            query.push(`${k} = $${i + 1}`);
            values.push(v);
          }
          if (!values.length) {
            throw new Error('Error : Nothing to update');
          }

          values.push(id);
          const objectSet = `${query.join(',')}`;

          const res = await client.query(
            `UPDATE products SET ${objectSet} WHERE id = $${values.length} RETURNING *`,
            values,
          );
          // console.log(`DEBUG: product updated  ${JSON.stringify(res.rows[0])}`);
          return res.rows[0];
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
          // working
          // await client.query('DELETE FROM products WHERE id=$1', [id]);
          await client.query(`UPDATE products SET deleted_at = $1 WHERE id = $2`, [new Date(), id]);
          return true;
        } catch (err) {
          console.error('delete product failed', err.message || err);
          throw err;
        }
      },

      getAllProduct: async () => {
        try {
          const res = await client.query(`SELECT * FROM products WHERE deleted_at IS NULL`);
          return res.rows;
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
