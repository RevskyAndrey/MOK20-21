const express = require('express');
const { task3: thirdTask } = require('../task');

const task3 = express.Router();
const goods = require('../../goods.json');

task3.get('/', (req, res) => {
  res.json(thirdTask(goods));
});

module.exports = task3;
