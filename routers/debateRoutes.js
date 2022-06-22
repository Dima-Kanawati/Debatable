/**
 * debatesRoutes.js, responsible for defining APIs/routes for debates.
 * Dima Kanawati, 2022
 */

const debateService = require('../services/debateService');
const Router = require('express').Router();

/**
 * Add Debate Router.
 */

Router.post('/', debateService.addDebate);

module.exports = Router;