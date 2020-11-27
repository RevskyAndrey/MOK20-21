const { myMap } = require('./index');

module.exports = (goods) => {
  return myMap(goods, ({ type = 'N/A', color = 'N/A', quantity = 0, price, priceForPair }) => {
    const cost = priceForPair || price;
    const isPair = !!priceForPair;
    const discount = 0;
    return { type, color, quantity, price: cost, isPair, discount };
  });
};
