const controller = require('../controllers/controller');

module.exports = (request, response) => {
  const { url, method, queryParams, body: data } = request;

  if (method === 'GET' && url === '/') return controller.home(response);

  if (method === 'GET' && url === `/task1?field=${queryParams.field}&value=${queryParams.value}`)
    return controller.task1(queryParams, response);

  if (method === 'GET' && url === '/task2') return controller.task2(response);

  if (method === 'GET' && url === '/task3') return controller.task3(response);
  // if (method === 'POST' && url === '/comment') return comment(data, response, queryParams);
  else return notFound(response);
};

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
}
