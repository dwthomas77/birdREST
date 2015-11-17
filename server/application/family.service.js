/**
 * @module application/FamilyService
 */
'use strict';

module.exports = {
    getFamilies: getFamilies,
    getFamily: getFamily,
    createFamily: createFamily,
    removeFamily: removeFamily
};

var persistence = require('./persistence');
var familyRepository = persistence.familyRepository;

/**
 * Creates a new family and inserts it in to the database.
 *
 * @static
 * @param {FamilyReq} familyReq
 * @return {Promise<Family>} A promise that returns the inserted family
 */
function createFamily(familyReq) {
    var requiredErrorList = [],
        errorMsg = 'Required fields are missing: ',
        requiredFields = [
            'uid',
            'name',
            'description'
        ];

    requiredFields.forEach(function(property) {
        if (!familyReq[property]) {
            requiredErrorList.push(property);
        }
    });

    if (requiredErrorList.length > 0) {
        throw(errorMsg + requiredErrorList.join(', '));
    }

    return familyRepository.createFamily(familyReq);
}

/**
 * Gets all Families
 * @return {Promise<Family[]>} A promise that returns a list of all Families
 */
function getFamilies() {
    return familyRepository.getFamilies();
}

/**
 * Gets a Family by uid
 * @param {String} uid
 * @return {Promise<Family>} A promise that returns a Family
 */
function getFamily(uid) {
    return familyRepository.getFamily(uid);
}

/**
 * Deletes a Family from database
 * @param {String} uid
 * @return {Promise<Family>} A promise that returns the deleted Family
 */
function removeFamily(uid) {
    return familyRepository.removeFamily(uid);
}
