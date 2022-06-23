/**
 * debatesService.js, responsible for managing debates buisness logic.
 * Dima Kanawati, 2022
 */

const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
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

const updateDebate = async function (req, res) {
    console.log("Entered service");
    //Get the debate ID from the request parameters.
    const { debateId } = req.params;

    //Get the data.
    const data = req.body;

    try {
        const debate = await debatesRepo.updateDebate(debateId, data);
        await res.status(200).send(debate);
    }
    catch (err) {
        await res.status(400).send(err);
    }
}

const deleteDebate = async function (req, res) {
    //Get the debate ID from the request parameters. 
    const { debateId } = req.params;

    try {
        await debatesRepo.markDebateAsDeleted(debateId);
        await res.status(204).end();
    }
    catch (err) {
        await res.status(400).send(err);
    }
}

module.exports = {
    addDebate,
    updateDebate,
    deleteDebate
}