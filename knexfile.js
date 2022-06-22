// Update with your config settings.
require('dotenv').config();
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DB_HOST
    },
    migrations: {
      tableName: "Knex_migration"
    }
  }
};
