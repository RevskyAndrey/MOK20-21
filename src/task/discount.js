function getRandomInt() {
  // eslint-disable-next-line no-param-reassign
  const min = Math.ceil(1);
  // eslint-disable-next-line no-param-reassign
  const max = Math.floor(99);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDiscount(data) {
  const maxDiscount = 20;
  const yourDiscont = getRandomInt(1, 99);
  // eslint-disable-next-line no-param-reassign
  if (yourDiscont <= maxDiscount) data = yourDiscont;
  else {
    const err = new Error('not your day');
    // eslint-disable-next-line no-param-reassign
    data = err.message;
  }
  return data;
}

module.exports = (data) => {
  return getDiscount(data);
};
