-- -----------------------------------------------------------------------------
-- habitats
-- -----------------------------------------------------------------------------
INSERT INTO habitats
(uid, name, description)
VALUES ('WDLTHCKT', 'Woodland Thicket', 'Woodland edges, thickets, brushy semi-open habitats including dense bushes for nesting.');

INSERT INTO habitats
(uid, name, description)
VALUES ('SBURBN', 'Suburban Towns', 'Suburban fields, gardens, forest clearings, city parks.');

-- -----------------------------------------------------------------------------
-- regions
-- -----------------------------------------------------------------------------
INSERT INTO regions
(uid, name, description)
VALUES ('NENGL', 'New England', 'Maine, Vermont, New Hampshire, Massachusetts, Connecticut and Rhode Island.');

INSERT INTO regions
(uid, name, description)
VALUES ('MDATL', 'Mid Atlantic', 'New York, New Jersey, Pennsylvania.');

-- -----------------------------------------------------------------------------
-- families
-- -----------------------------------------------------------------------------
INSERT INTO families
(id, uid, name, description)
VALUES (1, 'CARD', 'Cardinals', 'Robust, seed-eating birds with strong bills.');

INSERT INTO families
(id, uid, name, description)
VALUES (2, 'NWSPROW', 'New World Sparrows', 'Small, plump, brown-grey birds with short tails and stubby, powerful beaks.');

-- -----------------------------------------------------------------------------
-- birds
-- -----------------------------------------------------------------------------
INSERT INTO birds
(id, name_common, name_scientific, family_id)
VALUES (1, 'Northern Cardinal', 'Cardinalis cardinalis', 1);

INSERT INTO birds
(id, name_common, name_scientific, family_id)
VALUES (2, 'Field Sparrow', 'Spizella pusilla', 2);



