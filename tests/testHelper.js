const knex = require('../knexHelper');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const clearDatabase = async function () {
    return await knex.raw('TRUNCATE debates, endorsements, users');
};

const closeConnection = async function () {
    return knex.destroy();
}

const addUsers = async function () {
    const hashedPassword = await bcrypt.hash('123456', 12);

    await knex('users').insert([
        {
            name: "Dima Kanawati",
            email: "dima@gmail.com",
            gender: "female",
            role: "admin",
            password: hashedPassword
        },
        {
            name: "omar Kanawati",
            email: "omar@gmail.com",
            gender: "male",
            role: "user",
            password: hashedPassword
        }
    ]);
}

const prepareDatabase = async function () {
    await addUsers();

    //Get the user. 
    const user = await knex.select('id')
        .from('users')
        .where({ role: 'user' })
        .first()

    //Add the fake debate.
    const debates = await knex('debates')
        .insert({
            title: faker.lorem.sentence(3),
            description: faker.lorem.sentence(8),
            user_id: user.id
        })
        .returning('*');
    return { user, debate: debates[0] }
}

module.exports = {
    closeConnection,
    clearDatabase,
    prepareDatabase
}