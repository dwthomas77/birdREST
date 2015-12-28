/**
 * @module persistence/BirdRepository
 */
'use strict';

module.exports = {
    addBirdRegion: addBirdRegion,
    getBirds: getBirds,
    createBird: createBird,
    getBirdById: getBirdById
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');
var Promise = require( 'bluebird' );

/**
 * Gets all Birds
 *
 * @static
 * @return {Promise<Bird[]>} A promise that returns a list of all birds
 */
function getBirds() {

    return knex
        .select(
            'b.id as bird_id',
            'b.name_common as bird_nameCommon',
            'b.name_scientific as bird_nameScientific',
            'f.uid as bird_family',
            'r.id as region_id',
            'r.uid as region_uid',
            'r.name as region_name',
            'r.description as region_description')
        .from('birds as b')
        .leftOuterJoin('families as f', 'b.family_id', 'f.id')
        .leftOuterJoin('bird_regions as br', 'b.id', 'br.bird_id')
        .leftOuterJoin('regions as r', 'br.region_id', 'r.id')
        .then(function(birds) {
            return joinjs.map(birds, resultMaps, 'birdMap', 'bird_');
        });
}

/**
 * Get a bird by Id
 *
 * @static
 * @param {Number} id
 * @return {Promise<Bird>} A promise that returns a Bird
 */
function getBirdById(id) {
    return knex
        .select(
            'b.id as bird_id',
            'b.name_common as bird_nameCommon',
            'b.name_scientific as bird_nameScientific',
            'f.uid as bird_family',
            'r.id as region_id',
            'r.uid as region_uid',
            'r.description as region_description')
        .from('birds as b')
        .leftOuterJoin('families as f', 'b.family_id', 'f.id')
        .leftOuterJoin('bird_regions as br', 'b.id', 'br.bird_id')
        .leftOuterJoin('regions as r', 'br.region_id', 'r.id')
        .where('b.id', id)
        .then(function(bird) {
            return joinjs.mapOne(bird, resultMaps, 'birdMap', 'bird_');
        });
}

/**
 * Creates a new bird and inserts it in to the database.
 *
 * @static
 * @param {BirdReq} birdReq
 * @return {Promise} A promise that returns the inserted bird
 */
function createBird(birdReq) {
    return knex('birds')
        .returning('id')
        .insert(birdReq)
        .then(function(id) {
            return getBirdById(id[0]);
        })
        .catch(function(err) {
            console.error(err);
        });
}

/**
 * Adds a junction betwen a bird and a region
 *
 * @static
 * @param {number} birdId
 * @param {number} regionId
 * @return {string} birdRegionId
 */
function addBirdRegion(birdId, regionId) {
    return knex('bird_regions')
        .returning('bird_region_id')
        .insert({
            bird_region_id: birdId + '_' + regionId,
            bird_id: birdId,
            region_id: regionId
        })
        .then(function(birdRegionId) {
            return Promise.resolve(birdRegionId);
        })
        .catch(function(err) {
            console.error(err);
        });
}