/**
 * debatesService.js, responsible for managing debates buisness logic.
 * Dima Kanawati, 2022
 */

const debatesRepo = require('../repositories/debatesRepository');

const addDebate = async function (req, res) {
    //Get the data from the body.
    const data = req.body;

    try {
        //Try to add the debate to the database.
        const insertedDebate = await debatesRepo.addDebate(data);
        //Send the response.
        await res.status(200).send(insertedDebate);
    }
    catch (err) {
        //Error happend at debate level.
        await res.status(400).send(err);
    }
};

module.exports = {
    addDebate
}