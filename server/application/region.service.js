/**
 * @module application/regionService
 */
'use strict';

module.exports = {
    getRegions: getRegions,
    getRegion: getRegion,
    createRegion: createRegion,
    removeRegion: removeRegion
};

var persistence = require('./persistence');
var regionRepository = persistence.regionRepository;

/**
 * Creates a new Region and inserts it in to the database.
 *
 * @static
 * @param {RegionReq} regionReq
 * @return {Promise<Region>} A promise that returns the inserted Region
 */
function createRegion(regionReq) {
    var requiredErrorList = [],
        errorMsg = 'Required fields are missing: ',
        requiredFields = [
            'uid',
            'name',
            'description'
        ];

    requiredFields.forEach(function(property) {
        if (!regionReq[property]) {
            requiredErrorList.push(property);
        }
    });

    if (requiredErrorList.length > 0) {
        throw(errorMsg + requiredErrorList.join(', '));
    }

    return regionRepository.createRegion(regionReq);
}

/**
 * Gets all Regions
 * @return {Promise<Region[]>} A promise that returns a list of all Regions
 */
function getRegions() {
    return regionRepository.getRegions();
}

/**
 * Gets a Region by uid
 * @param {String} uid
 * @return {Promise<Region>} A promise that returns a Region
 */
function getRegion(uid) {
    return regionRepository.getRegion(uid);
}

/**
 * Deletes a Region from database
 * @param {String} uid
 * @return {Promise<Region>} A promise that returns the deleted Region
 */
function removeRegion(uid) {
    return regionRepository.removeRegion(uid);
}
