/**
 * endorsementRepository.js, responsible for managing endorsements in the database.
 * Dima Kanawati, 2022
 */
const knex = require('../knexHelper');

const addOrUpdateEndorsement = async function (debateId, userId, opinion) {
    return knex
        .insert({
            debate_id: debateId,
            user_id: userId,
            opinion: opinion
        })
        .into('endorsements')
        .onConflict(['debate_id','user_id'])
        .merge()
        .returning('*')
};

module.exports = {
    addOrUpdateEndorsement
}