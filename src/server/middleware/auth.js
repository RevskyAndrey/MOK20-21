const { user } = require('../../config');

module.exports = (req, res, next) => {
  const basicAuth = `${user.name}:${user.password}`;
  const token = Buffer.from(basicAuth).toString('base64');
  const auth = `Basic ${token}`;
  if (req.headers.token !== auth) res.send('not authorization').status(403);
  console.log(`hello ${user.name}`);
  next();
};
