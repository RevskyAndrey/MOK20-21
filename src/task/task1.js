module.exports = (data, type, value) => {
  const array = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in item) {
      if (key === type && item[key] === value) {
        array.push(item);
      }
    }
  }
  return array;
};
