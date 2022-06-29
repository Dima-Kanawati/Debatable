/**
 * debatesRoutes.js, responsible for defining APIs/routes for debates.
 * Dima Kanawati, 2022
 */

const debateService = require('../services/debateService');
const { isAuthenticated, isInRole } = require('../services/usersService');
const Router = require('express').Router();

/**
 * Add Debate Router.
 */

Router.post('/', isAuthenticated, isInRole(['user']), debateService.addDebate);

/**
 * Update Debate Router.
 */
Router.put('/debate/:debateId', isAuthenticated, debateService.updateDebate);

/**
 * Delete Debate Router.
 */
Router.delete('/debate/:debateId', isAuthenticated, debateService.deleteDebate);

/**
 * Get debate Router.
 */
Router.get('/', debateService.parseOrderByForDebates, debateService.getDebates);

module.exports = Router;