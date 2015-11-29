/**
 * @module adapter/BirdResource
 */

'use strict';

module.exports = {
    addRoutes: addRoutes
};

// Adds routes to the api.
function addRoutes(api) {
    api.post('/birds', createBird);
    api.get('/birds', getBirds);
}

var birdService = require('../../application').birdService;

/**
 * Creates a new bird and inserts it in to the database.
 *
 * @static
 * @param {Object} req
 * @param {BirdReq} req.body
 * @param {Object} res
 */
function createBird(req, res) {

    birdService.createBird()
        .then(function(bird) {
            res.send(bird);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all birds
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 */
function getBirds(req, res) {

    birdService.getBirds()
        .then(function(birds) {
            res.send(birds);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}
