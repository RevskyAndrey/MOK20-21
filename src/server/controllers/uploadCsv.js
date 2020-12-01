const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const promisifiedPipeline = promisify(pipeline);

const { nanoid } = require('nanoid');

const csvToJson = require('../utils/csvToJson');

function checkDownloadCatalogs() {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR);
  try {
    fs.accessSync(uploadDir, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(uploadDir);
  }
}

function dayToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const hh = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  const ss = String(today.getSeconds()).padStart(2, '0');
  return `${dd}-${mm}-${yyyy}-${hh}:${min}:${ss}`;
}

module.exports = async function uploadCSV(inputStream) {
  const uploadDir = process.env.UPLOAD_DIR;
  const gunzip = createGunzip();
  const filePath = `${uploadDir}${dayToday()}-${Date.now()}-${nanoid(8)}.json`;
  const outputStream = fs.createWriteStream(filePath);

  checkDownloadCatalogs();
  try {
    await promisifiedPipeline(inputStream, gunzip, csvToJson, outputStream);
  } catch (err) {
    console.log('err', err);
  }
};
