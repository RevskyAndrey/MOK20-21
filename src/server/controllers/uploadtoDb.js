const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');

const errorHandler = require('../utils/errorHandler');

const promisifiedPipeline = promisify(pipeline);
const createCsvToDb = require('../utils/csvToDb');

module.exports = async function uploadCSV(inputStream) {
  try {
    const gunzip = createGunzip();
    const csvToDb = createCsvToDb();
    promisifiedPipeline(inputStream, gunzip, csvToDb);
    return true;
  } catch (err) {
    return errorHandler(err);
  }
};
