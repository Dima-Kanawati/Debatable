/**
 * debatesRepository.js, responsible for managing debates in the database.
 * Dima Kanawati, 2022
 */
const knex = require('../knexHelper');

const addDebate = async function (debateData) {
    return knex
        .insert(debateData)
        .into('debates')
        .returning('*')
};

const updateDebate = async function (debateId, updateData) {
    return knex('debates')
        .where({ id: debateId })
        .update(updateData)
        .returning('*');
}

const markDebateAsDeleted = async function (debateId) {
    return knex('debates')
        .where({ id: debateId })
        .update({ isDeleted: true });
}

module.exports = {
    addDebate,
    updateDebate,
    markDebateAsDeleted
}