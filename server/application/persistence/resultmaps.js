'use strict';

var domain = require('../../domain');

var resultMaps = [
    {
        mapId: 'birdMap',
        idProperty: 'id',
        createNew: function() {
            return new domain.Bird();
        },
        properties: [
            'nameCommon',
            'nameScientific',
            'family'
        ],
        collections: [
            {name: 'regions', mapId: 'regionMap', columnPrefix:'region_'}
        ]
    },
    {
        mapId: 'familyMap',
        idProperty: 'id',
        createNew: function() {
            return new domain.Family();
        },
        properties: [
            'uid',
            'name',
            'description'
        ]
    },
    {
        mapId: 'regionMap',
        idProperty: 'id',
        createNew: function() {
            return new domain.Region();
        },
        properties: [
            'uid',
            'name',
            'description'
        ]
    }
];

module.exports = resultMaps;