function home(response) {
  response.write('Home');
  response.end();
}

function task1(response) {
  response.write('task1');
  response.end();
}

function task2(response) {
  response.write('task2');
  response.end();
}

function task3(response) {
  response.write('task3');
  response.end();
}

module.exports = {
  home,
  task1,
  task2,
  task3,
};
