const { describe, it } = require('mocha');
const chai = require('chai');

chai.should();

const { faker } = require('@faker-js/faker');
const knex = require('../knexHelper');

const request = require('supertest');
const { app } = require('../app');

const testHelper = require('./testHelper');
let testData;

//Describe the tests.
describe('Testing Debatable Project', async function () {
    beforeEach(async function () {
        await testHelper.clearDatabase();
        testData = await testHelper.prepareDatabase();
    });
    after(async function () {
        await testHelper.closeConnection();
    });

    describe('Testing Endorsements', function () {
        it('Should create an endorsement correctly if all conditions are met', async function () {
            //Login as a user.
            const loginResponse = await request(app)
                .post('/users/login')
                .send({
                    email: 'omar@gmail.com',
                    password: '123456'
                })
                .expect(200);
            //Take the JWT from the login.
            const token = loginResponse.body.token;
            //Ensure that JWT exists.
            token.should.not.be.null;
            //Deside on a random opinion [for, against, neutral].
            const opinion = faker.helpers.arrayElement(['for', 'against', 'neutral']);
            //Use the token, and the random opinion, to add an endorsement on a random debate.
            const endorsementResponse = await request(app)
                .post('/debates/debate/' + testData.debate.id + '/endorsemenets')
                .set('token', token)
                .send({ opinion })
                .expect(200);
            //You should also get returned values from the api that match the one we inserted.
            const endorsement = endorsementResponse.body[0];

            endorsement.user_id.should.equal(loginResponse.body.user.id);
            endorsement.debate_id.should.equal(testData.debate.id);
            endorsement.opinion.should.equal(opinion);
        });
        it('Should not create endorsement if the user is not loggen in (token is missing)', async () => {
            //Determine a random opinion.
            const opinion = faker.helpers.arrayElement(['for', 'against', 'neutral']);
            //Create endorsement api.
            await request(app)
                .post('/debates/debate/' + testData.debate.id + '/endorsemenets')
                .send({ opinion })
                .expect(403);
            //Query the database, should NOT contain an endorsement. 
            const endorsements = await knex.select('id').from('endorsements');
            endorsements.length.should.equal(0);
        });
        it('Should not create two endorsements if the user changed the endorsement', async () => {
            //Login as a user.
            const loginResponse = await request(app)
                .post('/users/login')
                .send({
                    email: 'omar@gmail.com',
                    password: '123456'
                })
                .expect(200);
            //Take the JWT from the login.
            const token = loginResponse.body.token;
            //Ensure that JWT exists.
            token.should.not.be.null;
            //Determine two random opinions.
            const opinions = faker.helpers.arrayElements(['for', 'against', 'neutral'], 2);
            //Use token and the first random opinion to create the first endorsement.
            const endorsementResponse1 = await request(app)
                .post('/debates/debate/' + testData.debate.id + '/endorsemenets')
                .set('token', token)
                .send({ opinion: opinions[0] })
                .expect(200);
            //Use token and the second random opinion to create the second endorsement on the same debate. 
            const endorsementResponse2 = await request(app)
                .post('/debates/debate/' + testData.debate.id + '/endorsemenets')
                .set('token', token)
                .send({ opinion: opinions[1] })
                .expect(200);
            //Check the database, there should be only one endorsement.
            const dbResponse = await knex.count('*').from('endorsements');
            dbResponse[0].count.should.equal('1');
            //Check the database, the endorsement should match the second opinion.
            const storedEndorsement = await knex.select('opinion').from('endorsements').first();
            storedEndorsement.opinion.should.equal(opinions[1]);
        });
    });
});