module.exports = (data, type, value) => {
  const array = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    for (key in item) {
      if (key === type && item[key] === value) {
        array.push(item);
      }
    }
  }
  return array;
};
