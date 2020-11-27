const {
  home,
  task1: filterArrTask,
  task2: maxCostTask,
  task3: modArrTask,
  discountAll,
  changeJSON,
} = require('../controllers/controller');

function notFound(res) {
  res.statusCode = 404;
  res.end('404 page not found check you URL and try again');
}

module.exports = (request, response) => {
  const { url, method, queryParams, body: data } = request;

  if (method === 'GET' && url === '/') return home(response);

  if (method === 'GET' && url.startsWith('/task1?')) return filterArrTask(response, queryParams);

  if (method === 'GET' && url === '/task2') return maxCostTask(response);

  if (method === 'GET' && url === '/task3') return modArrTask(response);

  if (method === 'GET' && url === '/products/discounts') return discountAll(response);

  if (method === 'POST' && url === '/changeJSON') return changeJSON(data, response);

  return notFound(response);
};
