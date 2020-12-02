const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, '../', 'goods.json');

const goods = require('../../goods.json');
const {
  task1: firstTask,
  task2: secondTask,
  task3: thirdTask,
  discount: discountForItem,
  myMap,
} = require('../task');

const optimizeJson = require('../utils/optimizeJson');

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

// POST  127.0.0.1:3000/changeJSON
function changeJSON(data, response) {
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 1));
  response.write('Post result = ');
  response.end(JSON.stringify(data));
}

function optimizeJSON(response, fileName) {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR);
  const listFiles = fs.readdirSync(uploadDir);
  const result = listFiles.includes(fileName);
  if (result) {
    optimizeJson(fileName);
    response.end(JSON.stringify(`starting optimization filename ${fileName} `));
    return;
  }
  response.end(JSON.stringify(` not found filename ${fileName}`));
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  discountAll,
  changeJSON,
  optimizeJSON,
};
