const express = require('express');
const loginRouter = express.Router();
const loginController = require('../Controllers/login');

loginRouter.post('/login', loginController.login);
loginRouter.post('/register', loginController.Registration);

module.exports = loginRouter;