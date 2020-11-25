const min = 1;
const max = 99;
const maxDiscount = 20;
const myMap = require('./myMap');
const task3 = require('./task3');

function getRandomInt() {
  return Math.floor(Math.random() * (max - min)) + min;
}

function priceCalculation(price, discount) {
  const cost = price.slice(1);
  return (cost * (1 - discount / 100)).toFixed(2);
}

function generateDiscount(callback) {
  setTimeout(() => {
    const yourDiscont =   getRandomInt();
    if (yourDiscont < maxDiscount) return callback(null, yourDiscont);
    return callback(new Error('not your day'));
  }, 50);
}

function generateValidDiscount(callback) {
  generateDiscount((err, res) => {
    if (err) return generateValidDiscount(callback);
    return callback(null, res);
  });
}

function generateValidDiscountPromise() {
  return new Promise((resolve, reject) =>
    generateValidDiscount((error, discount) => (error ? reject(error) : resolve(discount))),
  );
}

function getDiscountAllItems(goods) {
  const arr = task3(goods);
  return myMap(goods, (item) => {
    generateValidDiscountPromise().then((res) => {
        item.discount = `${res}%`;
        item.newPrice = priceCalculation(item.price, res);
        console.log(item);
        return item;
      },
    );
    return arr;
  });

  // myMap(arr, (item) => {
  //   generateValidDiscountPromise().then((res) => {
  //     item.discount = res;
  //
  //     //
  //     // if (item.type === 'hat' && item.color === 'red') {
  //     //   item.newPrice = checkDiscount(item.price);
  //     //   item.newPrice = checkDiscount(item.newPrice);
  //     //   item.newPrice = checkDiscount(item.newPrice);
  //     // }
  //     //
  //     // item.discount = generateValidDiscount();
  //     // item.newPrice += '$';
  //     console.log(' item.discount ', item.discount);
  //   });
  //   return item;
  // });
  return arr;
}

module.exports = (goods) => {
  return getDiscountAllItems(goods);
};
