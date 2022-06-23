/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    //Define the two tables.
    return knex.schema.createTable('users', function (table) {
        table.uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v1()'));

        table.string('name').notNullable();
        table.string('email').notNullable().unique();

        table.enu('role', ['admin', 'user'], { userNative: true, enumName: 'user_role' })
            .notNullable().defaultTo('user');

        table.enu('gender', ['male', 'female'], { userNative: true, enumName: 'user_gender' })

        table.timestamp('created_at').defaultTo(knex.fn.now());
    })

        .createTable('endorsements', function (table) {
            table.uuid('id')
                .primary()
                .notNullable()
                .defaultTo(knex.raw('uuid_generate_v1()'));

            table.uuid('user_id').notNullable();
            table.foreign('user_id').references('id').inTable('users');

            table.uuid('debate_id').notNullable();
            table.foreign('debate_id').references('id').inTable('debates');

            table.enu('opinion', ['for', 'against', 'neutral'], { userNative: true, enumName: 'endorsement_opinion' });

            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.unique(['user_id', 'debate_id']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
