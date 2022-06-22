/**
 * debatesRepository.js, responsible for managing debates in the database.
 * Dima Kanawati, 2022
 */
const knexHelper = require('../knexHelper');

const addDebate = async function(debateData){
    return knexHelper
        .insert(debateData)
        .into('debates')
        .returning('*')
};

module.exports = {
    addDebate
}