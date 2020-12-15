const { Transform } = require('stream');

function makeProducts(csvKeys, csvRows) {
  return csvRows.map(row => {
    const csvValues = row.split(',');

    const productEntries = csvKeys.map( (key, i) => {

      let value = csvValues[i] ?? 'N/A';

      if (key === 'quantity') {
        value = Number.parseInt(csvValues[i], 10);
        if (Number.isNaN(value)) {
          console.error(`We have a problem. Invalid CSV quantity:`, value);
          value = 0;
        }
      }

      if (key === 'price') value = `$${value}`;

      return [key, value];
    });

    const product = Object.fromEntries(productEntries);
    return JSON.stringify(product);
  });
}

function csvToJson() {
  let namesProduct;
  let productFragment;

  const transform = (chunk, encoding, callback) => {
    const csvRows = chunk.toString().split('\n');
    let output = '';

    if (!namesProduct) {
      namesProduct = csvRows.shift().split(',');
      output += '[\n';
    } else {
      output += ',\n';
    }

    if (productFragment) {
      csvRows[0] = `${productFragment}${csvRows[0]}`;
    }

    productFragment = csvRows.pop();

    if (csvRows.length === 0) {
      callback(null, '');
      return;
    }

    const result = makeProducts(namesProduct, csvRows);
console.log(result)
    output += result.join(',\n');

    callback(null, output);
  };

  const flush = callback => {
    callback(null, '\n]');
  };
z
  return new Transform({ transform, flush });
}

module.exports = csvToJson;
