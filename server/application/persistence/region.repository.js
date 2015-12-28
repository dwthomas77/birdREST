/**
 * @module persistence/RegionRepository
 */
'use strict';

module.exports = {
    getRegions: getRegions,
    createRegion: createRegion,
    getRegion: getRegion,
    getRegionById: getRegionById,
    removeRegion: removeRegion
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');

/**
 * Gets all Regions
 *
 * @static
 * @return {Promise<Region[]>} A promise that returns a list of all Regions
 */
function getRegions() {

    return knex
        .select(
            'r.id as region_id',
            'r.uid as region_uid',
            'r.name as region_name',
            'r.description as region_description')
        .from('regions as r')
        .then(function(regions) {
            return joinjs.map(regions, resultMaps, 'regionMap', 'region_');
        });
}

/**
 * Get a Region by Uid
 *
 * @static
 * @param {String} uid
 * @return {Promise<Region>} A promise that returns a Region
 */
function getRegion(uid) {
    return knex
        .select()
        .from('regions')
        .where('uid', uid)
        .then(function(region) {
            return joinjs.mapOne(region, resultMaps, 'regionMap');
        });
}

/**
 * Get a Region by Id
 *
 * @static
 * @param {Number} id
 * @return {Promise<Region>} A promise that returns a Region
 */
function getRegionById(id) {
    return knex
        .select()
        .from('regions')
        .where('id', id)
        .then(function(region) {
            return joinjs.mapOne(region, resultMaps, 'regionMap');
        });
}

/**
 * Creates a new Region and inserts it in to the database.
 *
 * @static
 * @param {RegionReq} regionReq
 * @return {Promise} A promise that returns the inserted Region
 */
function createRegion(regionReq) {
    return knex('regions')
        .returning('id')
        .insert(regionReq)
        .then(function(id) {
            return getRegionById(id[0]);
        })
        .catch(function(err) {
            console.error(err);
        });
}

/**
 * Removes a Region from the database
 * @static
 * @param {String} uid
 * @return {object} A promise that returns the deleted Region
 */
function removeRegion(uid) {
    var regionToRemove = getRegion(uid);

    return knex.raw('delete from regions where uid = \'' + uid + '\'')
        .then(function() {
            return regionToRemove;
        })
        .catch(function(err) {
            console.error(err);
        });
}
