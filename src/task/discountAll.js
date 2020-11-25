const myMap = require('./myMap');
const task3 = require('./task3');
const generateValidDiscountPromise = require('./discount');


function priceCalculation(price, discount) {
  return (price.slice(1) * (1 - discount / 100)).toFixed(2);
}

function getDiscountAllItems(goods) {
  const arr = task3(goods);

  myMap(goods, (item) => {
    const discount = generateValidDiscountPromise().then((res) => {
      return res;
    });
    item.discount = discount;
  })
  return arr;
}

module.exports = (goods) => {
  return getDiscountAllItems(goods);
};
