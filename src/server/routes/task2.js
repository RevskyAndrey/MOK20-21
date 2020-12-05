const express = require('express');
const { task2: maxCostTask } = require('../task');

const task2 = express.Router();

task2.get('/', (req, res) => {
  res.json(maxCostTask);
});

module.export = task2;
