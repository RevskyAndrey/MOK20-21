const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fs = require('fs');

const promisifiedPipeline = promisify(pipeline);

const { nanoid } = require('nanoid');
const createCvsToJSON = require('../utils/CSV-to-JSON');

function dayToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

module.exports = async function uploadCSV(inputStream) {
  const uploadDir = process.env.UPLOAD_DIR;
  const gunzip = createGunzip();
  const filePath = `${uploadDir}${dayToday()}-${Date.now()}-${nanoid(8)}.json`;
  const outputStream = fs.createWriteStream(filePath);
  const csvToJson = createCvsToJSON();

  try {
    await promisifiedPipeline(inputStream, gunzip, csvToJson, outputStream);
  } catch (err) {
    console.err('err', err);
  }

  // try {
  //   await fs.promises.rm(filePath);
  // } catch (rmErr) {
  //   console.error(`Unable to remove JSON ${filePath}`, rmErr);
  //   throw new Error('Unable to remove JSON');
  // }
};
