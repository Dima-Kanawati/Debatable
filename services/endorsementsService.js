/**
 * endorsementsService.js, responsible for managing endorsements buisness logic.
 * Dima Kanawati, 2022
 */

const endorsementsRepo = require('../repositories/endorsementRepository')

const addEndorsement = async function (req, res) {
    //Get the data.
    let data = req.body;
    //Get the debate id.
    let { debateId } = req.params;



    //Insert the data to the database.
    try {
        const endorsement = await endorsementsRepo.addOrUpdateEndorsement(debateId, req.user.id, data.opinion);
        await res.status(200).send(endorsement);
    }
    catch (err) {
        await res.status(400).send(err);
    }
}

module.exports = {
    addEndorsement
}