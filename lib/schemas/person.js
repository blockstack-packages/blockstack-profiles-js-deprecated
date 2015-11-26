'use strict'

var convertPersonProfileFromLegacyFormat = require('../legacy-formats/person')

function Person() {   
}

Person.convertFromLegacyFormat = function(profile) {
    return convertPersonProfileFromLegacyFormat(profile)
}

module.exports = Person
