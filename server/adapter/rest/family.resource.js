/**
 * @module adapter/FamilyResource
 */

'use strict';

module.exports = {
    addRoutes: addRoutes
};

// Adds routes to the api.
function addRoutes(api) {
    api.post('/families', createFamily);
    api.get('/families', getFamilies);
}

var familyService = require('../../application').familyService;

/**
 * Creates a new family and inserts it in to the database.
 *
 * @static
 * @param {Object} req
 * @param {FamilyReq} req.body
 * @param {Object} res
 */
function createFamily(req, res) {

    familyService.createFamily(req.body)
        .then(function(family) {
            res.send(family);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all families
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 */
function getFamilies(req, res) {

    familyService.getFamilies()
        .then(function(families) {
            res.send(families);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send({'message': error.toString()});
        });
}
