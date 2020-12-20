const { Transform } = require('stream');
const {  db: config } = require('../../config');

const db = require('../../db')(config);

function makeProducts(csvKeys, csvRows) {
  return csvRows.map(row => {
    const csvValues = row.split(',');

    const productEntries = csvKeys.map((key, i) => {

      let value = csvValues[i] ?? 'N/A';

      if (key === 'price') value = `${value}`;
      return [key, value];
    });
    productEntries.pop();
    return Object.fromEntries(productEntries);
  });
}


function csvToDb() {
  let namesProduct;
  let productFragment;
  let result = [];

  const transform = (chunk, encoding, callback) => {
    const csvRows = chunk.toString().split('\n');

    if (!namesProduct) {
      namesProduct = csvRows.shift().split(',');

    }

    if (productFragment) {
      csvRows[0] = `${productFragment}${csvRows[0]}`;
    }

    productFragment = csvRows.pop();

    if (csvRows.length === 0) {
      callback(null, '');
      return;
    }

    result = makeProducts(namesProduct, csvRows);
    // console.table(result);

    callback(null, null);
  };

  const flush = callback => {
    result.forEach(async (item) => {
     await db.createProduct(item);
    })

    callback(null, null);
  };
  return new Transform({ transform, flush });
}

module.exports = csvToDb;
