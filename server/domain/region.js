'use strict';

var _ = require('lodash');

/**
 * A geographic region
 *
 * <pre>
 * Example:
 *   {
 *      id: 1,
 *      uid: 'NE',
 *      name: 'New England',
 *      description: 'Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont',
 *   }
 * </pre>
 *
 * @class Region
 * @property {number}   id
 * @property {string}   uid
 * @property {string}   name
 * @property {string}   description
 */

var Region = function(regionReq) {
    if (regionReq) {
        _.extend(this, regionReq);
    }
};

/**
 * @typedef {Object}    RegionReq
 * @property {string}   uid
 * @property {string}   name
 * @property {string}   description
 */

module.exports = Region;
