const express = require('express');
const { task2: secondTask } = require('../task');

const task2 = express.Router();

task2.get('/', (req, res) => {
  res.json(secondTask);
});

module.exports = task2;
