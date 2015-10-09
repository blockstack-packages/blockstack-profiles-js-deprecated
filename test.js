'use strict'

var test = require('tape'),
    fs = require('fs')

var TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    decodeToken = require('jwt-js').decodeToken,
    PrivateKeychain = require('keychain-manager').PrivateKeychain,
    PublicKeychain = require('keychain-manager').PublicKeychain,
    profileFormatting = require('./index').formatting,
    signProfileTokens = require('./index').signProfileTokens,
    profileDirectory = require('./sample-data'),
    BlockchainID = require('./index').BlockchainID

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    tokenSigner = new TokenSigner('ES256k', rawPrivateKey),
    tokenVerifier = new TokenVerifier('ES256k', rawPublicKey),
    tokenRecords = []

var privateKeychain = new PrivateKeychain(),
    publicKeychain = privateKeychain.publicKeychain()

function writeFiles(zoneFile, tokenFile, profile) {
    fs.writeFile('docs/zoneFile.md', '```json\n' + JSON.stringify(zoneFile, null, 4) + '\n```', function(err) {
        if (!err) {
            console.log('zone file written')
        } else {
            console.log(err)
        }
    })

    fs.writeFile('docs/tokenFile.md', '```json\n' + JSON.stringify(tokenFile, null, 4) + '\n```', function(err) {
        if (!err) {
            console.log('token file written')
        } else {
            console.log(err)
        }
    })

    fs.writeFile('docs/profile.md', '```json\n' + JSON.stringify(profile, null, 4) + '\n```', function(err) {
        if (!err) {
            console.log('profile file written')
        } else {
            console.log(err)
        }
    })
}

test('tokenizeProfile', function(t) {
    t.plan(2)

    tokenRecords = signProfileTokens('ES256k', privateKeychain, profileDirectory.ryan_id)
    t.ok(tokenRecords, 'tokens should have been created')

    var tokensVerified = true
    tokenRecords.map(function(tokenRecord) {
        try {
            tokenVerifier.verify(tokenRecord.token, tokenRecord.data.payload.issuer.publicKey)
        } catch(err) {
            console.log(err.stack)
            tokensVerified = false
        }
    })
    t.equal(tokensVerified, true, 'all tokens should be valid')
})

test('reconstructProfile', function(t) {
    t.plan(2)

    var profile = profileFormatting.tokensToV3Profile(tokenRecords, publicKeychain)
    t.ok(profile, 'profile should have been reconstructed')
    t.equal(profile.name, 'Ryan Shea', 'profile name should match the reference')
    //console.log(profile)
})

test('blockchainID', function(t) {
    t.plan(6)
    
    var blockchainID = BlockchainID.fromFlatProfile('ryan.id', profileDirectory.ryan_id)
    t.ok(blockchainID, 'blockchain ID profile object should have been created')

    var hostUrls = ['https://s3.amazonaws.com/mq9/ryan.json'],
        checksums = [{ field: 'pgp[0].publicKey', hash: profileDirectory.pgpPublicKeyHash, algorithm: 'SHA256' }],
        zoneFile = blockchainID.zoneFile(publicKeychain, hostUrls, checksums)
    t.ok(zoneFile, 'zone file should have been created')
    //console.log(JSON.stringify(zoneFile, null, 4))

    var tokenFile = blockchainID.signTokens(privateKeychain)
    t.ok(tokenFile, 'token file should have been created')
    //console.log(JSON.stringify(tokenFile, null, 4))

    var profile = new BlockchainID.fromTokens('ryan', tokenRecords, publicKeychain).profile()
    t.ok(profile, 'profile should have been constructed')
    //console.log(JSON.stringify(profile, null, 4))

    var blockchainID2 = new BlockchainID('ryan.id', profile)
    t.ok(blockchainID, 'blockchain ID profile object should have been created')
    t.equal(JSON.stringify(blockchainID2.flatProfile), JSON.stringify(profileDirectory.ryan_id), 'flat profile should be equal to the original')

    writeFiles(zoneFile, tokenFile, profile)
})

test('fromV2Profile', function(t) {
    t.plan(2)

    var blockchainID = BlockchainID.fromV2Profile('ryan.id', profileDirectory.ryan_v2)
    t.ok(blockchainID, 'blockchain ID object should have been created')

    var profile = blockchainID.profile()
    t.ok(profile, 'profile should have been created')
})

