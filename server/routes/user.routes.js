const express = require('express');
const { getUser, userLogin, userSignup } = require('../controllers/user.controller');
const { signupValidator } = require('../middleware/signup.validator');
const { loginValidator } = require('../middleware/login.validator');
const { authUser } = require('../middleware/auth');

const userRoutes = express.Router();

userRoutes.post('/signup', signupValidator ,userSignup)
userRoutes.post('/login', loginValidator, userLogin)
userRoutes.get('/', authUser, getUser)

module.exports = userRoutes;