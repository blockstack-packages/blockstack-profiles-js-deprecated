'use strict'

var test = require('tape')

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    tokenSigner = new TokenSigner('ES256k', rawPrivateKey),
    tokenVerifier = new TokenVerifier('ES256k', rawPublicKey),
    decodeToken = require('jwt-js').decodeToken,
    tokensToV3Profile = require('./index').tokensToV3Profile,
    tokens = [],
    profileDirectory = require('./sample-data'),
    signProfileTokens = require('./index').signProfileTokens,
    BlockchainID = require('./index').BlockchainID

test('tokenizeProfile', function(t) {
    t.plan(2)

    tokens = signProfileTokens(tokenSigner, 'ryan.id', profileDirectory.ryan_id)
    t.ok(tokens, 'tokens should have been created')

    var tokensVerified = true
    tokens.map(function(token) {
        try {
            tokenVerifier.verify(token, rawPublicKey)
        } catch(err) {
            console.log(err.stack)
            tokensVerified = false
        }
    })
    t.equal(tokensVerified, true, 'all tokens should be valid')

    var tokenFile = []

    // Log decoded tokens
    tokens.map(function(token) {
        tokenFile.push({
            token: token,
            data: decodeToken(token)
        })
    })
})

test('reconstructProfile', function(t) {
    t.plan(2)

    var profile = tokensToV3Profile(tokens, tokenVerifier)
    t.ok(profile, 'profile should have been reconstructed')
    t.equal(profile.name, 'Ryan Shea', 'profile name should match the reference')
})

test('blockchainID', function(t) {
    t.plan(6)
    
    var blockchainID = BlockchainID.fromFlatProfile('ryan.id', profileDirectory.ryan_id)
    t.ok(blockchainID, 'blockchain ID profile object should have been created')

    var hostUrls = ['https://s3.amazonaws.com/mq9/ryan.json'],
        checksums = [{ field: 'pgp[0].publicKey', hash: profileDirectory.pgpPublicKeyHash, algorithm: 'SHA256' }],
        zoneFile = blockchainID.zoneFile(hostUrls, checksums)
    t.ok(zoneFile, 'zone file should have been created')
    //console.log(JSON.stringify(zoneFile, null, 4))

    var tokenFile = blockchainID.tokenFile(tokenSigner)
    t.ok(tokenFile, 'token file should have been created')
    console.log(JSON.stringify(tokenFile, null, 4))

    var profile = blockchainID.profile()
    t.ok(profile, 'profile should have been constructed')
    console.log(JSON.stringify(profile, null, 4))

    var blockchainID2 = new BlockchainID('ryan.id', profile)
    t.ok(blockchainID, 'blockchain ID profile object should have been created')
    t.equal(JSON.stringify(blockchainID2.flatProfile), JSON.stringify(profileDirectory.ryan_id), 'flat profile should be equal to the original')
})

test('fromV2Profile', function(t) {
    t.plan(2)

    var blockchainID = BlockchainID.fromV2Profile('ryan.id', profileDirectory.ryan_v2)
    t.ok(blockchainID, 'blockchain ID object should have been created')

    var profile = blockchainID.profile()
    t.ok(profile, 'profile should have been created')
})
