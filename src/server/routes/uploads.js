const express = require('express');
const fs = require('fs');

const { uploadDir, optimizedDir } = require('../../config');

const uploads = express.Router();
const uploadCSV = require('../controllers/uploadCsv');
const { optimizeJSON } = require('../controllers/optimizeJSON');

uploads.get('/', (req, res) => {
  const uploadFiles = fs.readdirSync(uploadDir);
  const optimizedFiles = fs.readdirSync(optimizedDir);
  const upResult = [...uploadFiles].filter((item) => item !== 'optimized');
  const resResult = {};
  if (upResult.length === 0 && optimizedFiles.length === 0) {
    res.send(JSON.stringify({ status: 'no files ' }));
  }
  if (upResult.length > 0) {
    resResult.uploaded = JSON.stringify(upResult);
  } else {
    resResult.uploaded = JSON.stringify('no files');
  }
  if (optimizedFiles.length > 0) {
    resResult.optimize = JSON.stringify(optimizedFiles);
  } else {
    resResult.optimize = JSON.stringify('no files');
  }
  res.send(JSON.stringify(resResult));
});

uploads.put('/', (req, res) => {
  try {
    uploadCSV(req);
  } catch (err) {
    console.log(' Failed to upload csv.gz ', err);
    res.status(500).json({ status: err });
    return;
  }
  // res.status(201).json({ status: 'All ok' });
  res.status(201).json({ status: 'your file uploaded' });
});

uploads.post('/optimize/:filename', (req, res) => {
  const { filename } = req.params;
  optimizeJSON(filename, res);
});

module.exports = uploads;
