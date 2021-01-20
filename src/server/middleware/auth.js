const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config');


function authentificate(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.send('not authorization').status(403);
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) throw new Error('Token expired!');
      req.user = user;
      next();
    });
  }
  res.send('not authorization').status(403);
}


module.exports = authentificate;
