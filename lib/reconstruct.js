'use strict'

var mergeObjects = require('./utils').mergeObjects

function reconstructProfile(tokenizer, tokens) {
    if (!(tokenizer && tokens)) {
        throw Error('tokenizer and tokens are required')
    }
    var profile = {}
    tokens.map(function(token) {
        var decodedToken = tokenizer.decode(token),
            claim = decodedToken.payload.claim,
            publicKey = decodedToken.payload.issuer.publicKey
        tokenizer.verify(token, publicKey)
        mergeObjects(profile, claim)
    })
    return profile
}

module.exports = reconstructProfile