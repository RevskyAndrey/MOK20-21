const { task1: firstTask, task2: secondTask, task3 } = require('./task');

const goods = require('./goods.json');

boot(goods, 'type', 'socks');

function boot(goods, type, value) {
  console.log('task1 = ', firstTask(goods, type, value));
  console.log('task3 = ', task3(goods));
  console.log('task2 = ', secondTask);
}
