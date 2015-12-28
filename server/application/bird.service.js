/**
 * @module application/BirdService
 */
'use strict';

module.exports = {
    getBirds: getBirds,
    getBird: getBird,
    createBird: createBird,
    addBirdRegion: addBirdRegion
};

var persistence = require('./persistence'),
    birdRepository = persistence.birdRepository,
    familyService = require('./family.service'),
    regionService = require('./region.service'),
    Promise = require( 'bluebird' );

/**
 * Creates a new person and inserts it in to the database.
 *
 * @static
 * @param {BirdReq} birdReq
 * @return {Promise<Bird>} A promise that returns the inserted bird
 */
function createBird(birdReq) {

    var requiredErrorList = [],
        curBird = null,
        regions = birdReq.regions,
        cleanBirdObj = {
            name_common: birdReq.nameCommon,
            name_scientific: birdReq.nameScientific
        },
        errorMsg = 'Required fields are missing: ',
        requiredFields = [
            'nameCommon',
            'nameScientific',
            'family'
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

    // top tier promise return - get family
    return familyService.getFamily(birdReq.family)
        // then add bird
        .then(function(family) {
            cleanBirdObj.family_id = family.id;
            return birdRepository.createBird(cleanBirdObj);
        })
        // then if regions add regions else next
        .then(function(bird) {

            var tasks = [];

            // save the bird obj
            curBird = bird.id;

            // region joins
            regions.forEach( function(region) {
                tasks.push(addBirdRegion(bird.id, region));
            });

            return Promise.all(tasks);

        })
        // the return new bird
        .then(function() {
            return getBird(curBird);
        });
}

/**
 * Gets all birds.
 * @return {Promise<Bird[]>} A promise that returns a list of all Birds
 */
function getBirds() {
    return birdRepository.getBirds();
}


/**
 * Gets a single bird.
 * @param {number} id
 * @return {Promise<Bird[]>} A promise that returns a list of all Birds
 */
function getBird(id) {
    return birdRepository.getBirdById(id);
}

/**
 * Joins a Bird with a Region
 *
 * @static
 * @param {number} birdId
 * @param {Region} region
 * @return {string} birdRegionId
 */
function addBirdRegion(birdId, region) {
    return regionService.getRegion(region)
        .then(function(region) {
            return birdRepository.addBirdRegion(birdId, region.id);
        });
}
