const goods = require('../../goods.json');
const { task3: thirdTask, discount: discountForItem, myMap } = require('../task');
const errorHandler = require('../utils/gracefulShutdown');

function priceCalculation(price, discount) {
  const cost = price.slice(1);
  return (cost * (1 - discount / 100)).toFixed(2);
}

module.exports = async function discountAll(res) {
  try {
    const newArr = thirdTask(goods);
    const promiseGoods = myMap(newArr, async (item) => {
      let discount = await discountForItem();
      if (item.type === 'hat') {
        discount += await discountForItem();
        if (item.color === 'red') {
          discount += await discountForItem();
        }
      }
      item.discount = `${discount}%`;
      item.newPrice = `$ ${priceCalculation(item.price, discount)}`;
      return item;
    });
    const newGoods = await Promise.all(promiseGoods);
    res.json(newGoods);
  } catch (err) {
    errorHandler(res, err);
  }
};
