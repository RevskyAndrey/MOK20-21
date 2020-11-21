const min = 1;
const max = 99;

function getRandomInt() {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDiscount() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const maxDiscount = 20;
      const yourDiscont = getRandomInt();
      if (yourDiscont <= maxDiscount) resolve(yourDiscont);
      else reject(new Error('not your day'));
    }, 50);
  });
}

module.exports = () => {
  return getDiscount();
};
