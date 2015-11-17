'use strict';

var _ = require('lodash');

/**
 * A bird
 *
 * <pre>
 * Example:
 *   {
 *      id: 5,
 *      nameCommon: 'Northern Cardinal',
 *      nameScientific: 'Cardinalis cardinalis',
 *      family: 3,
 *      region: 7,
 *      habitat: 12,
 *      food: [3, 8, 11]
 *   }
 * </pre>
 *
 * @class Bird
 * @property {number}   id
 * @property {string}   nameCommon
 * @property {string}   nameScientific
 * @property {number}   family
 * @property {number}   region
 * @property {number}   habitat
 * @property {number[]} food
 */

var Bird = function(birdReq) {
    if (birdReq) {
        _.extend(this, birdReq);
    }
};

/**
 * @typedef {Object}    BirdReq
 * @property {string}   nameCommon
 * @property {string}   nameScientific
 * @property {string}   [family]
 * @property {string}   [region]
 * @property {string}   [habitat]
 * @property {string[]} [food]
 */

module.exports = Bird;
