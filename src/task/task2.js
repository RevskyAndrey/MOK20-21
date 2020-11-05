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
  return product;
}

function topPrice(inArray) {
  let previosValue = 0;
  let previosIndex = 0;
  return inArray.reduce((value, item, index) => {
    // eslint-disable-next-line no-param-reassign
    value = getCost(item);
    if (value >= previosValue) {
      previosValue = value;
      previosIndex = index;
    }
    return inArray[previosIndex];
  });
}

module.exports = topPrice(goods);
