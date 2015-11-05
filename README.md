# birdREST

*A place for birds to REST*

## Purpose
Build a node server with a database connected REST API for supporting UI prototype development and to identify best practices in BDD, testing and code quality tools.

## Requirements

* PostgreSQL
* Node.js

## Setup Instructions

1. clone the repo `git clone https://github.com/dwthomas77/birdREST.git`
2. `cd birdREST`
3. `npm install`
4. create the database `createdb birds_db`
5. `psql birds_db`
6. `\i sql/create-schema.sql`
7. `\i sql/load-data.sql`
8. `\q`

## Testing

1. `mocha` - BDD with Yadda
2. `gulp test` - JSHint and JSCS