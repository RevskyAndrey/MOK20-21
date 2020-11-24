const myMap = require('./myMap');
const task3 = require('./task3');
const generateValidDiscountPromise = require('./discount');
const goods = require('../goods.json');

function priceCalculation(price, discount) {
  return (price.slice(1) * (1 - discount / 100)).toFixed(2);
}

function getDiscountAllItems() {
  const arr = task3(goods);
  generateValidDiscountPromise().then((res) => console.log(res));
  // myMap(goods, (item) => {
  //   item.price = item.price || item.priceForPair;
  //   delete item.priceForPair;
  //   if (!item.quantity) item.quantity = 0;
  //
  //   // if (item.type === 'hat') {
  //   //   item.newPrice = checkDiscount(item.price);
  //   //   item.newPrice = checkDiscount(item.newPrice);
  //   // }
  //   //
  //   // if (item.type === 'hat' && item.color === 'red') {
  //   //   item.newPrice = checkDiscount(item.price);
  //   //   item.newPrice = checkDiscount(item.newPrice);
  //   //   item.newPrice = checkDiscount(item.newPrice);
  //   // }
  //
  //   item.discount = generateValidDiscount();
  //   item.newPrice += '$';
  //   return item;
  //   arr.push(generateValidDiscount());
  // });
  //
  return arr;
}

module.exports = () => {
  return getDiscountAllItems();
};
