/**
 * endorsementsRoutes.js, responsible for defining APIs/routes for debates.
 * Dima Kanawati, 2022
 */

const endorsementsService = require('../services/endorsementsService');
const Router = require('express').Router();

/**
 * Add endorsements Router.
 */

Router.post('/', endorsementsService.addEndorsement);

module.exports = Router;