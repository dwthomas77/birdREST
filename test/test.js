/* globals before */

'use strict';

var Yadda = require('yadda');
var knex = require('../server/application/persistence/db').knex;

Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function(file) {

    featureFile(file, function(feature) {

        var libraries = require_feature_libraries(feature);
        var yadda = Yadda.createInstance(libraries);

        // Scenario hooks
        before(beforeScenario);

        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                yadda.run(step, done);
            });
        });
    });
});

function require_feature_libraries(feature) {
    return feature.annotations.libraries.split(', ').reduce(require_library, []);
}

function require_library(libraries, library) {
    return libraries.concat(require('./steps/' + library + '.steps'));
}

function beforeScenario() {
    // Truncate tables
    knex.raw('truncate table birds cascade')
        .catch(function(e) {
            console.error(e);
        });
}
