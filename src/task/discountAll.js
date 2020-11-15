const myMap = require('./myMap');
const getDiscount = require('./discount');
const goods = require('../goods.json');

function priceСalculation(price, discount) {
  return (price.slice(1) * (1 - discount / 100)).toFixed(2);
}

function getDiscountAllItems() {
  myMap(goods, (item) => {
    item.discount = getDiscount();
    let cost = item.price || item.priceForPair;
    if (item.discount === 'not your day') {
      item.discount = '0%';
      item.newPrice = cost;
    } else {
      item.newPrice = priceСalculation(cost, item.discount);
      item.discount += '%';
    }

    return item;
  });

  return goods;
}

module.exports = (data) => {
  return getDiscountAllItems();
};
