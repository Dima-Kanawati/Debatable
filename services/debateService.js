/**
 * debatesService.js, responsible for managing debates buisness logic.
 * Dima Kanawati, 2022
 */

const debatesRepo = require('../repositories/debatesRepository');
const { parseOrderBy } = require('../helpers/helpers');

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

const getDebates = async function (req, res) {
    //Get the offset and limit for pagination.
    let { offset, limit, searchTerm, orderBy } = req.query;

    //If offset is not provided, default value for it is = 0;
    offset = offset ?? 0;
    limit = limit ?? 10;

    if (limit > 100) {
        limit = 100;
    }

    try {
        const debates = await debatesRepo.getDebates(offset, limit, searchTerm, orderBy);
        await res.status(200).send(debates);
    }
    catch (err) {
        console.log(err);
        await res.status(400).send(err);
    }
}

const parseOrderByForDebates = async function (req, res, next) {
    //Get orderBy, if it was sent by the user.
    const { orderBy } = req.query;
    if (!orderBy) {
        req.query.orderBy = [{
            column: 'created_at', order: 'desc'
        }]
    }
    else {
        req.query.orderBy = parseOrderBy(req.query.orderBy);
    }
    return next();
}

module.exports = {
    addDebate,
    updateDebate,
    deleteDebate,
    getDebates,
    parseOrderByForDebates
}