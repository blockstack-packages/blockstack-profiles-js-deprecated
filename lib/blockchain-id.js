'use strict'

var formatting = require('./formatting'),
    decodeToken = require('jwt-js').decodeToken,
    hasprop = require('hasprop'),
    signProfileTokens = require('./formatting').signProfileTokens

function BlockchainID(username, profile, isFlatProfile) {
    this.username = username
    if (isFlatProfile) {
        this.flatProfile = profile
    } else {
        this.flatProfile = formatting.v3ProfileToFlatProfile(profile)
    }
    this.signingAlgorithm = 'ES256k'
}

BlockchainID.prototype.signTokens = function(privateKeychain) {
    // create the tokens
    var tokenRecords = signProfileTokens(this.signingAlgorithm, privateKeychain, this.flatProfile),
        tokenFile = tokenRecords

    // return the token file
    return tokenFile
}

BlockchainID.prototype.zoneFile = function(publicKeychain, tokenFileUrls, checksums) {
    // create the base zone file
    var zoneFile = {
        origin: this.username,
        ttl: '1h',
        records: []
    }

    // create a zone file record for each URL
    tokenFileUrls.map(function(url) {
        zoneFile.records.push({
            name: '@',
            class: 'IN',
            type: 'CNAME',
            data: url,
            publicKeychain: publicKeychain.toString(),
            checksums: checksums
        })
    })

    // return the zone file
    return zoneFile
}

BlockchainID.prototype.profile = function() {
    return formatting.flatProfileToV3Profile(this.flatProfile)
}

BlockchainID.fromFlatProfile = function(username, profile) {
    return new BlockchainID(username, profile, true)
}

BlockchainID.fromTokens = function(username, tokens, publicKeychain) {
    var v3Profile = formatting.tokensToV3Profile(tokens, publicKeychain)
    return new BlockchainID(username, v3Profile)
}

BlockchainID.fromV2Profile = function(username, profile) {
    var flatProfile = formatting.v2ProfileToFlatProfile(profile)
    return new BlockchainID(username, flatProfile, true)
}

module.exports = BlockchainID
