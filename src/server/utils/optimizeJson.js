const fs = require('fs');
const path = require('path');

const OptimizedDir = path.resolve(process.env.OPTIMIZED_DIR);

function parserJson(inputData) {
  return inputData.map((product) => {
    try {
      return JSON.parse(product);
    } catch (err) {
      console.error('Sorry we have some problem to parse Json', err);
      return {};
    }
  });
}

function checkOptimizedCatalogs() {
  try {
    fs.accessSync(OptimizedDir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(OptimizedDir);
  }
}

module.exports = async (fileName) => {
  checkOptimizedCatalogs();
  const pathFile = `${process.env.UPLOAD_DIR}${fileName}`;
  const readStream = fs.createReadStream(pathFile, { encoding: 'utf8' });
  let itFirst = true;
  let productFragment = '';
  const goods = '';

  readStream.on('data', (chunk) => {
    let data = chunk;
    if (itFirst) {
      itFirst = false;
      data = data.slice(1);
    } else {
      data = productFragment + data;
    }
    const productsRow = data.split(',\n');
    productFragment = productsRow.pop();
    const json = parserJson(productsRow);
    console.log(json);
  });
  readStream.once('end', () => {
    console.log('\nFinish');
  });

  console.table(goods);
};
