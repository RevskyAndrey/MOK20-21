const min = 1;
const max = 99;
const maxDiscount = 20;

function getRandomInt() {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateDiscount(callback) {
  setTimeout(() => {
    const yourDiscont = getRandomInt();
    if (yourDiscont <= maxDiscount) callback(null, yourDiscont);
    callback(new Error('not your day'));
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

module.exports = () => {
  return generateValidDiscountPromise();
};
