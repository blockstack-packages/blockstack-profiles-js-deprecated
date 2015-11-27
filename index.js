'use strict'

module.exports = {
    Person: require('./lib/schemas/person'),
    Organization: require('./lib/schemas/organization'),
    createZoneFile: require('./lib/zonefile'),
    signProfileTokens: require('./lib/tokening').signProfileTokens,
    getProfileFromTokens: require('./lib/tokening').getProfileFromTokens,
    flattenObject: require('./lib/utils').flattenObject,
    unflattenObject: require('./lib/utils').unflattenObject
}
