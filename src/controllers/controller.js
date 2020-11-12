const goods = require('../goods.json');
const { task1: firstTask, task2: secondTask, task3: thirdTask } = require('../task');

let resultArr = [];

function home(request, response) {
  console.log(request);
  response.write('Home');
  response.end();
}

// 127.0.0.1:3000/task1?field=type&value=socks
function task1(response, queryParams) {
  resultArr = firstTask(goods, queryParams.field, queryParams.value);
  response.write('task1 result = ');
  response.end(JSON.stringify(resultArr));
}

function task2(response) {
  response.write('tak2 result = ');
  response.end(JSON.stringify(secondTask));
}

function task3(response) {
  response.write('tak3 result = ');
  response.end(JSON.stringify(thirdTask(goods)));
}

// POST
// 127.0.0.1:3000/comment
function comment(data, response) {
  // response.write('tak3 result = ');
  console.log(data);
  response.end(JSON.stringify(data));
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  comment,
};
