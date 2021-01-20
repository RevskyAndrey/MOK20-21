require('dotenv').config();

const { fatal } = require('../server/utils/fatalError');

module.exports = {
  port: process.env.PORT || 3000,
  origin: process.env.ORIGIN || 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR || './uploads/',
  optimizedDir: process.env.OPTIMIZED_DIR || './uploads/optimized/',
  autoOptimizeTime: process.env.AUTO_OPTIMIZE_TIME || 1800000,
  user: {
    name: 'Masters',
    password: 'Academy',
  },
  db: {
    defaultType: process.env.DB_WRAPPER || 'knex',
    config: {
      knex: {
        client: 'postgresql',
        connection: {
          user: process.env.DB_USER || fatal('FATAL : DB_USER is not defined'),
          host: process.env.DB_HOST || fatal('FATAL : DB_HOST is not defined'),
          port: process.env.DB_PORT || fatal('FATAL : DB_PORT is not defined'),
          database: process.env.DB_NAME || fatal('FATAL : DB_NAME is not defined'),
          password: process.env.DB_PASS || fatal('FATAL : DB_PASS is not defined'),
        },
        pool: {
          min: 2,
          max: 10,
        },
        debug: false,
      },
      pg: {
        user: process.env.DB_USER || fatal('FATAL : DB_USER is not defined'),
        host: process.env.DB_HOST || fatal('FATAL : DB_HOST is not defined'),
        port: process.env.DB_PORT || fatal('FATAL : DB_PORT is not defined'),
        database: process.env.DB_NAME || fatal('FATAL : DB_NAME is not defined'),
        password: process.env.DB_PASS || fatal('FATAL : DB_PASS is not defined'),
      },
    },
  },
};
