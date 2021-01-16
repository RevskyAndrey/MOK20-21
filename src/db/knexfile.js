require('dotenv').config({path: `${process.env.PWD}/.env`});

const {db: {knex}} = require('../config');

module.exports = {
    development: knex,
};
