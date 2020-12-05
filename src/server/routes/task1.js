const express = require('express');
const { task1: firstTask } = require('../task');

const task1 = express.Router();
const goods = require('../../goods.json');

task1.get('/', (req, res) => {
  const { field } = res.query;
  const { value } = res.query;
  const resultArr = firstTask(goods, field, value);
  res.json(resultArr);
});

module.export = task1;
