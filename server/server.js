'use strict';

var log = console.log;

// -----------------------------------------------------------------------------
// Start the database
// -----------------------------------------------------------------------------
var persistence = require('./application/persistence');
log('Database Started');

// -----------------------------------------------------------------------------
// Start the HTTP Server and expose the RESTful API
// -----------------------------------------------------------------------------
var port = process.env.PORT || 8080;

var api = require('./adapter/rest/api');
var server = require('http').createServer(api);

// Start listening to HTTP requests
server.listen(port, function() {
    log('Listening on port ' + port);
});

// -----------------------------------------------------------------------------
// Stop the HTTP server and the database when SIGINT is received
// (i.e. Ctrl-C is pressed)
// -----------------------------------------------------------------------------
process.on('SIGINT', function() {
    log('SIGINT received ...');
    log(server.close);
    server.close(function() {
        log('Server stopped ...');
        persistence.destroyConnectionPool(function() {
            log('Database stopped ...');
            log('Exiting process ...');
            process.exit();
        });
    });
});
