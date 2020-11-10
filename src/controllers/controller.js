const goods = require('../goods.json');
const { task1: firstTask, task2: secondTask, task3: thirdTask } = require('../task');

let resultArr = [];

function home(request, response) {
  console.log(request);
  response.write('Home');
  response.end();
}

function task1(queryParams, response) {
  resultArr = firstTask(goods, queryParams.field, queryParams.value);
  response.write('task1 result = ');
  // в одну строку результат выполнения функции  постмен не выводит - глюк постмена или вебшторма ?
  response.write(JSON.stringify(resultArr));
  response.end();
}

function task2(response) {
  response.write('tak2 result = ');
  response.write(JSON.stringify(secondTask));
  response.end();
}

function task3(response) {
  response.write('tak3 result = ');
  response.write(JSON.stringify(thirdTask(goods)));
  response.end();
}

module.exports = {
  home,
  task1,
  task2,
  task3,
};
