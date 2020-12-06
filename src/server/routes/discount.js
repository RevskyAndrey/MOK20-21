const express = require('express');

const discount = express.Router();
const discountAll = require('../controllers/discountAll');

discount.get('/discounts', (req, res) => {
  discountAll(res);
});

module.exports = discount;
