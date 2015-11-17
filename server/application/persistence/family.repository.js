/**
 * @module persistence/FamilyRepository
 */
'use strict';

module.exports = {
    getFamilies: getFamilies,
    createFamily: createFamily,
    getFamily: getFamily,
    getFamilyById: getFamilyById,
    removeFamily: removeFamily
    // getFamilyByUid: getBirdByUid
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');

/**
 * Gets all Families
 *
 * @static
 * @return {Promise<Family[]>} A promise that returns a list of all families
 */
function getFamilies() {

    return knex
        .select(
            'f.id as family_id',
            'f.uid as family_uid',
            'f.name as family_name',
            'f.description as family_description')
        .from('families as f')
        .then(function(families) {
            return joinjs.map(families, resultMaps, 'familyMap', 'family_');
        });
}

/**
 * Get a family by Uid
 *
 * @static
 * @param {String} uid
 * @return {Promise<Family>} A promise that returns a Family
 */
function getFamily(uid) {
    return knex
        .select()
        .from('families')
        .where('uid', uid)
        .then(function(family) {
            return joinjs.mapOne(family, resultMaps, 'familyMap');
        });
}

/**
 * Get a family by Id
 *
 * @static
 * @param {Number} id
 * @return {Promise<Family>} A promise that returns a Family
 */
function getFamilyById(id) {
    return knex
        .select()
        .from('families')
        .where('id', id)
        .then(function(family) {
            return joinjs.mapOne(family, resultMaps, 'familyMap');
        });
}

/**
 * Creates a new family and inserts it in to the database.
 *
 * @static
 * @param {FamilyReq} familyReq
 * @return {Promise} A promise that returns the inserted family
 */
function createFamily(familyReq) {
    return knex('families')
        .returning('id')
        .insert(familyReq)
        .then(function(id) {
            return getFamilyById(id[0]);
        })
        .catch(function(err) {
            console.error(err);
        });
}

/**
 * Removes a family from the database
 * @static
 * @param {String} uid
 * @return {object} A promise that returns the deleted family
 */
function removeFamily(uid) {
    var familyToRemove = getFamily(uid);

    return knex.raw('delete from families where uid = \'' + uid + '\'')
        .then(function() {
            return familyToRemove;
        })
        .catch(function(err) {
            console.error(err);
        });
}
