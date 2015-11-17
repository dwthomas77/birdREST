'use strict';

var _ = require('lodash');

/**
 * A family of birds
 *
 * <pre>
 * Example:
 *   {
 *      id: 5,
 *      uid: 'Northern Cardinal',
 *      name: 'Cardinalis cardinalis',
 *      description: 'Robust, seed-eating birds with strong bills',
 *   }
 * </pre>
 *
 * @class Family
 * @property {number}   id
 * @property {string}   uid
 * @property {string}   name
 * @property {string}   description
 */

var Family = function(familyReq) {
    if (familyReq) {
        _.extend(this, familyReq);
    }
};

/**
 * @typedef {Object}    FamilyReq
 * @property {string}   uid
 * @property {string}   name
 * @property {string}   description
 */

module.exports = Family;
