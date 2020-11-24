module.exports = (goods) => {
  return goods.map(({ type = 'N/A', color = 'N/A', quantity = 0, price, priceForPair }) => {
    // eslint-disable-next-line no-param-reassign
    price = price || priceForPair;
    // eslint-disable-next-line no-undef
    isPair = !!priceForPair;
    // eslint-disable-next-line no-undef
    discount = 0;
    // eslint-disable-next-line no-undef
    return { type, color, quantity, price, isPair, discount };
  });
};
