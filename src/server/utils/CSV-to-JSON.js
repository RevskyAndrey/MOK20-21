const { Transform } = require('stream');

function csvToJson() {
  const isFirst = true;
  // const namesColumn = [];
  const transform = (chunk, encoding, callback) => {
    if (isFirst) {
      // parse namesColumn ...

      // eslint-disable-next-line no-const-assign
      isFirst = !isFirst;
      callback(null, 'JSON start\n');
    }
    callback(null, 'JSON string\n');
  };

  const flush = (callback) => {
    console.log('no more data to read');
    callback(null, '\nFinish');
  };

  return new Transform({ transform, flush });
}

module.exports = {
  csvToJson,
};
