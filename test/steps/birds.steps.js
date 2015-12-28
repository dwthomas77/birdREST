'use strict';

var Yadda = require('yadda');
var assert = require('assert');
var English = Yadda.localisation.English;
var dictionary = new Yadda.Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

var Promise = require( 'bluebird' );
var _ = require('lodash');
var birdService = require('../../server/application/bird.service');

var birds = [];

module.exports = English.library(dictionary)

    .given('the following Birds\n$table', function(table, next) {
        var tasks = [];

        table.forEach( function(bird) {
            // clean data
            bird.regions = bird.regions.split(',');
            // load creation request
            tasks.push(birdService.createBird(bird));
        });
        Promise.all(tasks)
            .then(function() {
                next();
            });
    })
    .when('I request all the Birds', function(next) {

        birdService.getBirds()
            .then(function(birdsList) {
                birds = birdsList;
                next();
            });
    })
    .then('I should receive the following Birds\n$table', function(expectedBirds, next) {

        // match each bird successfully
        expectedBirds.forEach(function(testBird) {
            var matchedBird = _.findWhere(birds, {nameCommon: testBird.nameCommon});
            assert.equal(testBird.uid, matchedBird.uid, 'no matching bird was found for ' + testBird.name_common);
            assert.equal(testBird.family, matchedBird.family, 'family did not match for ' + testBird.name_common);
            assert.equal(testBird.name_common, matchedBird.name_common,
                'common name did not match for ' + testBird.name_common);
        });

        next();
    });
