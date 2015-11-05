/**
 * @module application/BirdService
 */
'use strict';

module.exports = {
    getBirds: getBirds,
    createBird: createBird
};

var persistence = require('./persistence');
var birdRepository = persistence.birdRepository;

/**
 * Creates a new person and inserts it in to the database.
 *
 * @static
 * @param {BirdReq} birdReq
 * @return {Promise<Bird>} A promise that returns the inserted bird
 */
function createBird(birdReq) {
    var requiredErrorList = [],
        errorMsg = 'Required fields are missing: ',
        requiredFields = [
            'name_common',
            'name_scientific'
        ];

    requiredFields.forEach(function(property) {
        if (!birdReq[property]) {
            requiredErrorList.push(property);
        }
    });

    if (requiredErrorList.length > 0) {
        throw(errorMsg + requiredErrorList.join(', '));
    }

    return birdRepository.createBird(birdReq);
}

/**
 * Gets all birds.
 * @return {Promise<Bird[]>} A promise that returns a list of all Birds
 */
function getBirds() {
    return birdRepository.getBirds();
}
