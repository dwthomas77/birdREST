'use strict';

var db = require('./db');

module.exports = {
    knex: db.knex,
    destroyConnectionPool: db.destroyConnectionPool,
    birdRepository: require('./bird.repository'),
    familyRepository: require('./family.repository')
};
