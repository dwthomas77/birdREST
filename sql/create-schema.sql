-- Drop foreign keys
ALTER TABLE birds
    DROP CONSTRAINT birds_family_id_foreign;

-- Drop tables
DROP TABLE IF EXISTS birds;
DROP TABLE IF EXISTS bird_regions;
DROP TABLE IF EXISTS families;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS habitats;
DROP TABLE IF EXISTS food;

CREATE TABLE birds (
    id SERIAL PRIMARY KEY,
    name_common VARCHAR(64),
    name_scientific VARCHAR(64)
);

CREATE TABLE bird_regions (
    id SERIAL PRIMARY KEY,
    bird_region_id VARCHAR(8) UNIQUE
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
    
-- Junctions
ALTER TABLE bird_regions
  ADD COLUMN bird_id INTEGER,
  ADD CONSTRAINT bird_regions_bird_id_foreign FOREIGN KEY (bird_id) REFERENCES birds (id),
  ADD COLUMN region_id INTEGER,
  ADD CONSTRAINT bird_regions_region_id_foreign FOREIGN KEY (region_id) REFERENCES regions (id);
