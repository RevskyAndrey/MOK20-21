const {
  home,
  task1: filterArrTask,
  task2: maxCostTask,
  task3: modArrTask,
  discount: discountTask,
  discountAll,
  comment,
} = require('../controllers/controller');

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
}

module.exports = (request, response) => {
  const { url, method, queryParams, body: data } = request;

  if (method === 'GET' && url === '/') return home(response);

  if (method === 'GET' && url.startsWith('/task1?')) return filterArrTask(response, queryParams);

  if (method === 'GET' && url === '/task2') return maxCostTask(response);

  if (method === 'GET' && url === '/task3') return modArrTask(response);

  if (method === 'GET' && url === '/discount') return discountTask(response);

  if (method === 'GET' && url === '/discountAll') return discountAll(response);

  if (method === 'POST' && url === '/comment') return comment(data, response);

  return notFound(response);
};
