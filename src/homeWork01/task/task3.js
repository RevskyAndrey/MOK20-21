module.exports = (goods) => {
  const dolar = '$';
  goods.forEach(function (item) {
    if (!item.quantity) {
      item.quantity = 0;
    }
    if (!item.price) {
      item.price = '0';
    }
    if (!item.priceForPair) {
      item.priceForPair = dolar + item.price.slice(1) * 2;
    }
  });

  return goods;
};
