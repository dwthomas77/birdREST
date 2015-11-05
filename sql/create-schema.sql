-- Drop foreign keys
ALTER TABLE birds
    DROP CONSTRAINT birds_family_id_foreign;

-- Drop tables
DROP TABLE IF EXISTS birds;
DROP TABLE IF EXISTS families;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS habitats;
DROP TABLE IF EXISTS food;

CREATE TABLE birds (
    id SERIAL PRIMARY KEY,
    name_common VARCHAR(64),
    name_scientific VARCHAR(64)
);

CREATE TABLE families (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(12),
    name VARCHAR(64),
    description TEXT
);

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(12),
    name VARCHAR(64),
    description TEXT
);

CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(12),
    name VARCHAR(64),
    description TEXT
);

CREATE TABLE food (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(12),
    name VARCHAR(64)
);

-- Add foreign keys
ALTER TABLE birds
    ADD COLUMN family_id INTEGER,
    ADD CONSTRAINT birds_family_id_foreign FOREIGN KEY (family_id) REFERENCES families (id);
