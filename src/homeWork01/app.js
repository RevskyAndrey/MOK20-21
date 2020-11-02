const task = require('./task');

const goods = require('./goods.json');

boot(goods, 'type', 'socks');

function boot(goods, type, value) {
  console.log('task1 = ', task.task1(goods, type, value));
  console.log('task3 = ', task.task3(goods));
  console.log('task2 = ', task.task2);
}
