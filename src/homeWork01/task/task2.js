const goods = require('../goods.json');

function getCost(product) {
  if (!product.quantity) {
    return 0;
  }
  if (product.priceForPair) {
    return product.quantity * product.priceForPair.slice(1);
  }
  if (product.price) {
    return product.quantity * product.price.slice(1);
  }
}

function topPrice(goods) {
  let previosValue = 0;
  let previosIndex = 0;
  return goods.reduce(function (value, item, index) {
    value = getCost(item);
    if (value >= previosValue) {
      previosValue = value;
      previosIndex = index;
    }
    return goods[previosIndex];
  });
}

module.exports = topPrice(goods);
