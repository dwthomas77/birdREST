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
var familyService = require('./family.service');

var Promise = require( 'bluebird' );

/**
 * Creates a new person and inserts it in to the database.
 *
 * @static
 * @param {BirdReq} birdReq
 * @return {Promise<Bird>} A promise that returns the inserted bird
 */
function createBird(birdReq) {
    var requiredErrorList = [],
        tasks = [],
        cleanBirdObj = {
            name_common: birdReq.nameCommon,
            name_scientific: birdReq.nameScientific
        },
        errorMsg = 'Required fields are missing: ',
        requiredFields = [
            'nameCommon',
            'nameScientific'
        ];

    // Request Validation
    requiredFields.forEach(function(property) {
        if (!birdReq[property]) {
            requiredErrorList.push(property);
        }
    });

    if (requiredErrorList.length > 0) {
        throw(errorMsg + requiredErrorList.join(', '));
    }

    // Get IDs
    tasks.push(familyService.getFamily(birdReq.family));

    return Promise.all(tasks)
        .then(function(results) {
            cleanBirdObj.family_id = results[0].id;
            return birdRepository.createBird(cleanBirdObj);
        });
}

/**
 * Gets all birds.
 * @return {Promise<Bird[]>} A promise that returns a list of all Birds
 */
function getBirds() {
    return birdRepository.getBirds();
}
