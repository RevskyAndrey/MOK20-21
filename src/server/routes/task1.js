const express = require('express');
const { task1: firstTask } = require('../task');

const task1 = express.Router();
const goods = require('../../goods.json');

task1.get('/', (req, res) => {
  const { field } = req.query;
  let { value } = req.query;
  if (field === 'quantity') value = Number(value);
  res.json(firstTask(goods, field, value));
});

module.exports = task1;
