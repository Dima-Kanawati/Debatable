/**
 * usersRoutes.js, responsible for defining APIs/routes for users.
 * Dima Kanawati, 2022
 */

const usersService = require('../services/usersService');
const Router = require('express').Router();

/**
 * Register User API.
 */

Router.post('/register', usersService.hashPasswordMW, usersService.registerUser);

/**
 * Login User API.
 */
Router.post('/login', usersService.login);


module.exports = Router;

