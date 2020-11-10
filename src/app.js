require('dotenv').config({ path: 'src/.env' });

const http = require('http');
const requestHandler = require('./utils/requestHandler');

const server = http.createServer(requestHandler);
server.listen(Number(process.env.PORT), () =>
  console.log(` server has be  started on ${process.env.PORT}`),
);

// function boot(inArray, type, value) {
//   const resultArr = firstTask(inArray, type, value);
//   console.log('task1 = ', resultArr);
//   console.log('task3 = ', task3(resultArr));
//   console.log('task2 = ', secondTask);
// }
// boot(goods, 'type', 'socks');
