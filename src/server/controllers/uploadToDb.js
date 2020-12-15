const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');

const errorHandler = require('../utils/errorHandler');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = require('../utils/csvToJson');

module.exports = async function uploadfoDb(inputStream) {
  try {
    const gunzip = createGunzip();

    const csvToJson = createCsvToJson();
    promisifiedPipeline(inputStream, gunzip, csvToJson);
  } catch (err) {
    errorHandler(err);
  }
};
