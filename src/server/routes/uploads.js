const express = require('express');
const fs = require('fs');
const { uploadDir, optimizedDir } = require('../../config');

const uploads = express.Router();
const uploadCSV = require('../controllers/uploadCsv');

uploads.get('/', (req, res) => {
  const uploadFiles = fs.readdirSync(uploadDir);
  const optinFiles = fs.readdirSync(optimizedDir);
  const upResult = [...uploadFiles].filter((item) => item !== 'optimized');
  const resResult = {};
  if (upResult.length === 0 && optinFiles.length === 0) {
    res.send(JSON.stringify({ status: 'no files ' }));
  }
  if (upResult.length > 0) {
    resResult.uploaded = JSON.stringify(upResult);
  } else {
    resResult.uploaded = JSON.stringify('no files');
  }
  if (optinFiles.length > 0) {
    resResult.optimize = JSON.stringify(optinFiles);
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
  res.status(201).json({ status: 'All ok' });
});

uploads.post('/optimize/', (req, res) => {
  // const fileName = req;
  // optimizeJSON(response, fileName);
  console.log(req.params);
  console.log(req.query);
  res.status(201).json({ status: 'All ok' });
});

module.exports = uploads;
