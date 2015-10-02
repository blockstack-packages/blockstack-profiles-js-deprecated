'use strict'

var formatting = require('./formatting'),
    decodeToken = require('jwt-js').decodeToken,
    hasprop = require('hasprop'),
    signProfileTokens = require('./formatting').signProfileTokens

function BlockchainID(username, profile) {
    this.username = username
    this.flatProfile = formatting.v3ProfileToFlatProfile(profile)
}

BlockchainID.prototype.tokenFile = function(tokenSigner) {
    // create the tokens
    var tokens = signProfileTokens(tokenSigner, this.username, this.flatProfile),
        tokenFile = []

    // add in the token records
    tokens.map(function(token) {
        tokenFile.push({
            token: token,
            data: decodeToken(token),
            encrypted: false
        })
    })

    // return the token file
    return tokenFile
}

BlockchainID.prototype.zoneFile = function(tokenFileUrls, checksums) {
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
    var v3Profile = formatting.flatProfileToV3Profile(profile)
    return new BlockchainID(username, v3Profile)
}

BlockchainID.fromTokens = function(username, tokens) {
    var flatProfile = formatting.tokensToFlatProfile(tokens)
    return new BlockchainID(username, flatProfile)
}

BlockchainID.fromV2Profile = function(username, profile) {
    var flatProfile = formatting.v2ProfileToFlatProfile(profile)
    return new BlockchainID(username, flatProfile)
}

module.exports = BlockchainID
