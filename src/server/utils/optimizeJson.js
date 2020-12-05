const fs = require('fs');
const config = require('../../config');

function parserJson(data) {
  return data.map((product) => {
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
    fs.accessSync(config.optimizedDir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(config.optimizedDir);
  }
}

function optimizeArray(inputArray, outputArray) {
  inputArray.forEach((product) => {
    const { type, color, quantity, price } = product;
    const elementIndex = outputArray.findIndex(
      (element) => element.type === type && element.color === color && element.price === price,
    );
    if (elementIndex >= 0) {
      outputArray[elementIndex].quantity += +quantity;
    } else {
      outputArray.push({ ...product, quantity: +quantity });
    }
  });
  return outputArray;
}

module.exports = async (fileName) => {
  checkOptimizedCatalogs();
  const pathFile = `${config.uploadDir}${fileName}`;
  const readStream = fs.createReadStream(pathFile, { encoding: 'utf8' });
  let itFirst = true;
  let productFragment = '';
  const goods = [];
  console.log(`Start file optimization ${pathFile}`);
  readStream.on('error', (err) => console.error(err));
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
    optimizeArray(json, goods);
  });
  readStream.once('end', () => {
    const totalQuantity = goods.reduce((acc, current) => acc + current.quantity, 0);
    const outDir = `${config.optimizedDir}/${fileName}`;
    console.log('Total quantity =', totalQuantity);
    fs.writeFile(outDir, JSON.stringify(goods), () => {
      console.log(`Finish optimization file : ${fileName}`);
      fs.unlink(pathFile, () => {
        console.log(`File has been remover  ${pathFile} `);
      });
    });
  });
};
