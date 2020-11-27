require('dotenv').config();

const http = require('http');
const requestHandler = require('./utils/requestHandler');

const server = http.createServer(requestHandler);
server.listen(Number(process.env.PORT), () =>
  console.log(`Server has be  started on ${process.env.PORT} `),
);
