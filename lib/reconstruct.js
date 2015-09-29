'use strict'

var mergeObjects = require('./utils').mergeObjects,
    decodeToken = require('jwt-js').decodeToken

function reconstructProfile(tokens, tokenVerifier) {
    if (!tokens) {
        throw Error('tokenVerifier and tokens are required')
    }
    var profile = {}
    tokens.map(function(token) {
        var decodedToken = decodeToken(token),
            claim = decodedToken.payload.claim,
            publicKey = decodedToken.payload.issuer.publicKey
        if (tokenVerifier) {
            tokenVerifier.verify(token, publicKey)
        }
        mergeObjects(profile, claim)
    })
    return profile
}

module.exports = reconstructProfile