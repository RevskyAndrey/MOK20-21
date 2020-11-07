const { task1: firstTask, task2: secondTask, task3 } = require('./task');

const goods = require('./goods.json');

function boot(inArray, type, value) {
  const resultArr = firstTask(inArray, type, value);
  console.log('task1 = ', resultArr);
  console.log('task3 = ', task3(resultArr));
  console.log('task2 = ', secondTask);
}

boot(goods, 'type', 'socks');
