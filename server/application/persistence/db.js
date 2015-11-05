'use strict';

// -----------------------------------------------------------------------------
// Database configuration
// -----------------------------------------------------------------------------
var dbConfig = {
    client: 'postgresql',
    debug: false,
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'bird_db',
        charset: 'utf8'
    }
};

// -----------------------------------------------------------------------------
// Initialize the ORM (knex)
// -----------------------------------------------------------------------------
var initializeKnex = require('knex');
var knex = initializeKnex(dbConfig);

// -----------------------------------------------------------------------------
// Destroy the database connection pool
// -----------------------------------------------------------------------------
function destroyConnectionPool(callback) {
    if (knex && knex.client) {
        knex.destroy(callback);
    }
    else {
        callback();
    }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
module.exports = {
    knex: knex,
    destroyConnectionPool: destroyConnectionPool
};
