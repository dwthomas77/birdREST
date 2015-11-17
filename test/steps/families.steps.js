'use strict';

var Yadda = require('yadda');
var assert = require('assert');
var English = Yadda.localisation.English;
var dictionary = new Yadda.Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

var Promise = require( 'bluebird' );
var _ = require('lodash');
var familyService = require('../../server/application/family.service');

var families = [];

module.exports = English.library(dictionary)

    .given('the following Families\n$table', function(table, next) {
        var tasks = [];

        table.forEach( function(family) {
            tasks.push(familyService.createFamily(family));
        });

        Promise.all(tasks)
            .then(function() {
                next();
            });
    })
    .when('I request all the Families', function(next) {

        familyService.getFamilies()
            .then(function(familiesList) {
                families = familiesList;
                next();
            });
    })
    .then('the following families should be included\n$table', function(expectedFamilies, next) {

        var delTasks = [];

        // remove ids for normalized testing
        families.forEach(function(family) {
            delete family.id;
        });

        // assert each expected family and then remove it
        expectedFamilies.forEach(function(family) {
            var matchingObj = _.findWhere(families, {uid: family.uid});
            assert.deepEqual(family, matchingObj, 'Family objects match');
            delTasks.push(familyService.removeFamily(family.uid));
        });

        Promise.all(delTasks)
            .then(function() {
                next();
            })
            .catch(function(err) {
                console.error(err);
            });

    });
