const { home, task1, task2, task3 } = require('../controllers/controller');

module.exports = (request, response) => {
  const { url, method, queryParams, body: data } = request;

  if (method === 'GET' && url === '/') return home(response);
  if (method === 'GET' && url === '/task1') return task1(response);
  if (method === 'GET' && url === '/task2') return task2(response);
  if (method === 'GET' && url === '/task3') return task3(response);
  // if (method === 'POST' && url === '/comment') return comment(data, response, queryParams);
  else return notFound(response);
};

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
}
