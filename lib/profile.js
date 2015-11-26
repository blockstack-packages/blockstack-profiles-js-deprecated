'use strict'

var profileToTokens = require('./tokening').profileToTokens,
    tokensToProfile = require('./tokening').tokensToProfile,
    flattenObject   = require('./utils').flattenObject,
    unflattenObject = require('./utils').unflattenObject,
    createZoneFile  = require('./zonefile')

function BlockchainProfile() {
}

BlockchainProfile.tokensToProfile = function(tokenRecords, publicKeychain) {
    return tokensToProfile(tokenRecords, publicKeychain)
}

BlockchainProfile.profileToTokens = function(profile, privateKeychain) {
    return profileToTokens(profile, privateKeychain)
}

BlockchainProfile.profileToFlatObject = function(profile) {
    return flattenObject(profile)
}

BlockchainProfile.flatObjectToProfile = function(flatObject) {
    return unflattenObject(flatObject)
}

BlockchainProfile.zoneFile = function(username, publicKeychain, tokenFileUrls, checksums) {
    return createZoneFile(username, publicKeychain, tokenFileUrls, checksums)
}

module.exports = BlockchainProfile