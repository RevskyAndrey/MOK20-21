const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const { pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { promisify } = require('util');

const pathToFile = path.resolve(__dirname, '../', 'goods.json');
const cvsToJSON = require('../utils/CSV-to-JSON');
const goods = require('../../goods.json');
const {
  task1: firstTask,
  task2: secondTask,
  task3: thirdTask,
  discount: discountForItem,
  myMap,
} = require('../task');

const promisifiedPipeline = promisify(pipeline);
let resultArr = [];

function home(response) {
  response.end('Home');
}

// 127.0.0.1:3000/task1?field=type&value=socks
function task1(response, queryParams) {
  if (queryParams.field === 'quantity') queryParams.value = Number(queryParams.value);
  resultArr = firstTask(goods, queryParams.field, queryParams.value);
  response.write('task1 result = ');
  response.end(JSON.stringify(resultArr));
}

function task2(response) {
  response.write('tak2 result = ');
  response.end(JSON.stringify(secondTask));
}

function task3(response) {
  response.write('tak3 result = ');
  response.end(JSON.stringify(thirdTask(goods)));
}

function priceCalculation(price, discount) {
  const cost = price.slice(1);
  return (cost * (1 - discount / 100)).toFixed(2);
}

// 127.0.0.1:3000/products/discounts
async function discountAll(response) {
  try {
    const newArr = thirdTask(goods);
    const promiseGoods = myMap(newArr, async (item) => {
      let discount = await discountForItem();
      if (item.type === 'hat') {
        discount += await discountForItem();
        if (item.color === 'red') {
          discount += await discountForItem();
        }
      }
      item.discount = `${discount}%`;
      item.newPrice = `$ ${priceCalculation(item.price, discount)}`;
      return item;
    });
    const newGoods = await Promise.all(promiseGoods);
    response.end(JSON.stringify(newGoods));
  } catch (err) {
    console.error(err);
  }
}

// POST
// 127.0.0.1:3000/changeJSON
function changeJSON(data, response) {
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 1));
  response.write('Post result = ');
  response.end(JSON.stringify(data));
}

// POST
// 127.0.0.1:3000/loadingCSV

async function uploadCSV(inputStream, response) {
  const uploadDir = process.env.UPLOAD_DIR;
  const gunzip = createGunzip();
  const filePath = `${uploadDir}${nanoid(8)}-${Date.now()}-${nanoid(4)}.json`;
  const outputStream = fs.createWriteStream(filePath);
  try {
    await promisifiedPipeline(inputStream, gunzip, cvsToJSON(), outputStream);
  } catch (err) {
    console.err('err', err);
  }

  try {
    await fs.promises.rm(filePath);
  } catch (rmErr) {
    console.error(`Unable to remove JSON ${filePath}`, rmErr);
    throw new Error('Unable to remove JSON');
  }
  response.end(filePath);
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  discountAll,
  changeJSON,
  uploadCSV,
};
