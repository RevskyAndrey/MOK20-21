module.exports = (array, callback, thisArg) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback.call(thisArg, array[i], i, array));
  }
  return result;
};
