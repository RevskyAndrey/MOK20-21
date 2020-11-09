module.exports = (goods) => {
  return goods.map((item) => {
    if (!item.quantity) {
      item.quantity = 0;
    }
    if (!item.price) {
      item.price = item.priceForPair;
    }
    delete item.priceForPair;
    return item;
  });
};
