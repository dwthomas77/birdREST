/**
 * @module persistence/BirdRepository
 */
'use strict';

module.exports = {
    getBirds: getBirds,
    createBird: createBird,
    getBirdById: getBirdById
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');

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
            'f.uid as bird_family')
        .from('birds as b')
        .leftOuterJoin('families as f', 'b.family_id', 'f.id')
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
            'f.uid as bird_family')
        .from('birds as b')
        .leftOuterJoin('families as f', 'b.family_id', 'f.id')
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
