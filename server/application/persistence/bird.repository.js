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

/**
 * Gets all Birds
 *
 * @static
 * @return {Promise<Bird[]>} A promise that returns a list of all birds
 */
function getBirds() {
    return knex
        .select()
        .from('birds')
        .then(function(resultSet) {
            return resultSet;
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
        .select()
        .from('birds')
        .where('id', id)
        .then(function(bird) {
            return bird;
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
            console.log('there was an error');
            console.error(err);
        });
}
