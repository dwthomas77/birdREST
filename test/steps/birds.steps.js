'use strict';

var Yadda = require('yadda');
var assert = require('assert');
var English = Yadda.localisation.English;
var dictionary = new Yadda.Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

var Promise = require( 'bluebird' );
var birdService = require('../../server/application/bird.service');

var birds = [];

module.exports = English.library(dictionary)

    .given('the following Birds\n$table', function(table, next) {
        var tasks = [];

        table.forEach( function(bird) {
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
        // remove id for normalized testing
        birds.forEach(function(bird) {
            delete bird.id;
        });
        assert.deepEqual(birds, expectedBirds, 'Assert queried birds equal expected birds');
        next();
    });
