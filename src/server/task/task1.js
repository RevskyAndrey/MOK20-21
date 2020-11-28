module.exports = (data, type, value) => {
  return data.filter((item) => item[type] === value);
};
