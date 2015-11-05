# birdREST

*A place for birds to REST*

## Purpose
Build a server with a database connected REST API for supporting UI prototype develop and to identify best practices in BDD, testing and code quality tools.

## Requirements

* PostgreSQL
* Node.js

## Setup Instructions

1. clone the repo (git clone https://github.com/dwthomas77/birdREST.git)
2. cd birdREST
3. npm install
4. createdb birds_db
5. psql birds_db
6. \i sql/create-schema.sql
7. \i sql/load-data.sql
8. \q

## Testing

1. BDD with Yadda - type `mocha`
2. JSHint and JSCS - type `gulp test`