const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db');
const { accessTokenSecret, refreshTokenSecret, jwtKeys } = require('../../config');

const errorHandler = require('../utils/errorHandler');


async function login(req, res) {
  const { username } = req.body;
  const candidate = await db.findOneUser(username);
  console.log(candidate);
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const user = { username: candidate.username, password: candidate.password };
      const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
      const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: '15d' });

      res.status(200).json({ accessToken: `Bearer ${accessToken}`, RefreshToken: `${refreshToken}` });
    } else {
      res.status(401).json({ message: 'password incorrect' });
    }
  } else {
    res.status(404).json({ message: 'user does not exist' });
  }
}

async function register(req, res) {
  try {
    const { username } = req.body;
    const candidate = await db.findOneUser(username);

    if (candidate) {
      res.status(409).json({ message: 'such username already exists' });
    }
    const password = bcrypt.hashSync(req.body.password, jwtKeys);
    const user = { username: username, password: password };
    const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: '15d' });

    await db.createUser({ username, password, refreshToken });

    res.status(201).json({ username, password });
  } catch (err) {
    errorHandler(res, err);
  }
}

async function refreshToken(req, res) {
  try {
    // как подписывать рефреш токен правильно?
    const oldRefreshToken = req.headers.token.split(' ')[1];
     jwt.verify(oldRefreshToken, refreshTokenSecret, async(err, username) => {
      if (err) throw new Error('Token expired!');
      const candidate = await db.findOneUser(username);
       if (candidate && candidate.refreshToken === oldRefreshToken) {
         const user = { username: candidate.username, password: candidate.password };
         const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
         const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: '15d' });

         res.status(200).json({ accessToken: `Bearer ${accessToken}`, RefreshToken: `${refreshToken}` });

       }
    })
  } catch (err){
    errorHandler(res, err);
  }
}

module.exports = {
  login,
  register,
  refreshToken,
};
