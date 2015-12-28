'use strict';

var Yadda = require('yadda');
var assert = require('assert');
var English = Yadda.localisation.English;
var dictionary = new Yadda.Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

var Promise = require( 'bluebird' );
var _ = require('lodash');
var regionService = require('../../server/application/region.service');

var regions = [];

module.exports = English.library(dictionary)

    .given('the following Regions\n$table', function(table, next) {
        var tasks = [];

        table.forEach( function(region) {
            tasks.push(regionService.createRegion(region));
        });

        Promise.all(tasks)
            .then(function() {
                next();
            });
    })
    .when('I request all the Regions', function(next) {

        regionService.getRegions()
            .then(function(regionsList) {
                regions = regionsList;
                next();
            });
    })
    .then('the following Regions should be included\n$table', function(expectedRegions, next) {

        var delTasks = [];

        // remove ids for normalized testing
        regions.forEach(function(region) {
            delete region.id;
        });

        // assert each expected family and then remove it
        expectedRegions.forEach(function(region) {
            var matchingObj = _.findWhere(regions, {uid: region.uid});
            assert.deepEqual(region, matchingObj, 'Region objects match');
            delTasks.push(regionService.removeRegion(region.uid));
        });

        Promise.all(delTasks)
            .then(function() {
                next();
            })
            .catch(function(err) {
                console.error(err);
            });

    });
