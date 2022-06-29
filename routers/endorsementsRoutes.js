/**
 * endorsementsRoutes.js, responsible for defining APIs/routes for debates.
 * Dima Kanawati, 2022
 */

const endorsementsService = require('../services/endorsementsService');
const { isAuthenticated } = require('../services/usersService');
const Router = require('express').Router();

/**
 * Add endorsements Router.
 */

Router.post('/:debateId/endorsemenets', isAuthenticated, endorsementsService.addEndorsement);

module.exports = Router;