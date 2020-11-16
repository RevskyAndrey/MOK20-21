const myMap = require('./myMap');
const getDiscount = require('./discount');
const goods = require('../goods.json');

function priceCalculation(price, discount) {
  return (price.slice(1) * (1 - discount / 100)).toFixed(2);
}

function checkDiscount(cost) {
  const discount = getDiscount();

  if (discount === 'not your day') return checkDiscount(cost);
  return priceCalculation(cost, discount);
}

function getDiscountAllItems() {

  myMap(goods, (item) => {
    item.price = item.price || item.priceForPair;
    delete item.priceForPair;

    if (!item.quantity) item.quantity = 0;

    if (item.type === 'hat') {
      item.newPrice = checkDiscount(item.price);
      item.newPrice = checkDiscount(item.newPrice);
    }

    if (item.type === 'hat' && item.color === 'red') {
      item.newPrice = checkDiscount(item.price);
      item.newPrice = checkDiscount(item.newPrice);
      item.newPrice = checkDiscount(item.newPrice);
    }

    item.newPrice = checkDiscount(item.price);
    item.newPrice += '$';
    return item;
  });

  return goods;
}

module.exports = () => {
  return getDiscountAllItems();
};
