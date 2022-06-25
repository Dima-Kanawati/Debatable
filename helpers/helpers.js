/**
 * helpers.js, contains random functions that are used across the backend.
 * Dima Kanawati, 2022
 */

/**
 * Converts the input given by the user for ordering fields into array of fields as expected by knex.
 * -created_at, title ->[
 *      { column: 'created_at, order: 'desc' },
 *      { column: 'title' }
 * ]
 * @params {String}         orderByString           Order By String is provided by the user.
 * @return {Array}                                  Array of values for columns to be sorted by knex.
 */
const lodash = require('lodash');

const parseOrderBy = function (orderByString) {
    const orderByStringsArray = orderByString.split(',');

    return lodash.map(orderByStringsArray, function (field) {
        if (field.indexOf('-') === 0) {
            return {
                column: field.substring(1),
                order: 'desc'
            }
        }
        return {
            column: field
        };
    });
}

module.exports = {
    parseOrderBy
}