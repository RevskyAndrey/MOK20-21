const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db');
const { jwtKeys } = require('../../config');

const errorHandler = require('../utils/errorHandler');

async function login(req, res) {
  const candidate = await db.findOneUser({ username: req.body.username });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          // userID: candidate._id,
        },
        jwtKeys,
        { expiresIn: 5 * 60 },
      );

      res.status(200).json({ token: `Bearer ${token}` });
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

    if (!candidate) {
      res.status(409).json({ message: 'such username already exists' });
    }
    console.log('register', req.body);
    const salt = bcrypt.genSaltSync(5);

    const password = bcrypt.hashSync(req.body.password, salt);
    await db.createUser({ username, password });

    res.status(201).json({ username, password });
  } catch (e) {
    errorHandler(res, e);
  }
}

module.exports = {
  login,
  register,
};
