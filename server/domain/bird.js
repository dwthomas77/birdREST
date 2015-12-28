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
 *      family: 3
 *   }
 * </pre>
 *
 * @class Bird
 * @property {number}   id
 * @property {string}   nameCommon
 * @property {string}   nameScientific
 * @property {number}   family
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
 * @property {string[]} [regions]
 * @property {string[]} [habitats]
 * @property {string[]} [food]
 */

/**
 * @typedef {Object} AssignmentExport
 * @example
 * <pre>
 *      {
 *          id: 2,
 *          nameCommon: 'Northern Cardinal',
 *          nameScientific: 'Cardinalis cardinalis',
 *          family: 'CARD',
 *          regions: [
 *              'NENGL',
 *              'MDATL'
 *          ],
 *          habitats: [
 *              'WDLTHCKT',
 *              'SBURBN'
 *          ]
 *      }
 * </pre>
 * @typedef {Object}    BirdReq
 * @property {number}   id
 * @property {string}   nameCommon
 * @property {string}   nameScientific
 * @property {string}   [family]
 * @property {string[]} [regions]
 * @property {string[]} [habitats]
 * @property {string[]} [food]
 */

module.exports = Bird;
