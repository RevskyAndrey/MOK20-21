module.exports = (goods) => {
  return goods.map(({ type = 'N/A', color = 'N/A', quantity = 0, price, priceForPair }) => {
    // eslint-disable-next-line no-param-reassign
    price = priceForPair;
    return { type, color, quantity, price };
  });
};
