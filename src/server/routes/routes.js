const fs = require('fs');
const path = require('path');

const {
  home,
  task1: filterArrTask,
  task2: maxCostTask,
  task3: modArrTask,
  discountAll,
  changeJSON,
  optimizeJson,
} = require('../controllers/controller');

const uploadCSV = require('../controllers/uploadCsv');

function notFound(res) {
  res.statusCode = 404;
  res.end('404 page not found check you URL and try again');
}

async function handleStreamRoutes(request, response) {
  const { url, method } = request;
  if (method === 'GET' && url === '/uploads') {
    const dir = path.resolve(process.env.UPLOAD_DIR);
    const listFiles = fs.readdirSync(dir);
    if (listFiles.length === 0) {
      response.end(JSON.stringify({ status: 'no files ' }));
      return;
    }
    const result = { ...listFiles };
    response.end(JSON.stringify(result));
    return;
  }

  if (method === 'PUT' && url === '/uploads') {
    try {
      await uploadCSV(request);
    } catch (err) {
      console.log(' Failed to upload csv.gz ', err);
      response.setHeader('Content-Type', 'application/json');
      response.status = 500;
      response.end(JSON.stringify({ status: err }));
      return;
    }
    response.setHeader('Content-Type', 'application/json');
    response.status = 200;
    response.end(JSON.stringify({ status: 'All ok' }));
  }
  notFound(response);
}

async function handleRoutes(request, response) {
  const { url, method, queryParams, body: data } = request;
  if (method === 'GET' && url === '/') return home(response);

  if (method === 'GET' && url.startsWith('/task1?')) return filterArrTask(response, queryParams);

  if (method === 'GET' && url === '/task2') return maxCostTask(response);

  if (method === 'GET' && url === '/task3') return modArrTask(response);

  if (method === 'GET' && url === '/products/discounts') return discountAll(response);

  if (method === 'POST' && url === '/changeJSON') return changeJSON(data, response);

  if (method === 'POST' && url.startsWith('/uploads/optimize/')) {
    const fileName = path.parse(url).base;
    return optimizeJson(response, fileName);
  }

  return notFound(response);
}

module.exports = {
  handleRoutes,
  handleStreamRoutes,
};
