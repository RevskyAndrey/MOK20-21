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
  inArray.sort((left, right) => getCost(left) - getCost(right));
  return inArray.pop();
}

module.exports = topPrice(goods);
