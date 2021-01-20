const express = require('express');
const { login, register,refreshToken} = require('../controllers/auth');

const authRouter = express.Router();

/* для регистрации отправлять JSON в виде {    "username":"Masters", "password":"Academy"} */
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/refresh', refreshToken);

module.exports = authRouter;
