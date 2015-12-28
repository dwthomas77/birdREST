/**
 * @module adapter/RegionResource
 */

'use strict';

module.exports = {
    addRoutes: addRoutes
};

// Adds routes to the api.
function addRoutes(api) {
    api.post('/regions', createRegion);
    api.get('/regions', getRegions);
}

var regionService = require('../../application').regionService;

/**
 * Creates a new region and inserts it in to the database.
 *
 * @static
 * @param {Object} req
 * @param {RegionReq} req.body
 * @param {Object} res
 */
function createRegion(req, res) {

    regionService.createRegion(req.body)
        .then(function(region) {
            res.send(region);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all regions
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 */
function getRegions(req, res) {

    regionService.getRegions()
        .then(function(regions) {
            res.send(regions);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}
