'use strict'

var test = require('tape'),
    fs = require('fs')

var TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    decodeToken = require('jwt-js').decodeToken,
    PrivateKeychain = require('keychain-manager').PrivateKeychain,
    PublicKeychain = require('keychain-manager').PublicKeychain

var profileDirectory = require('./sample-data'),
    BlockchainProfile = require('./index').BlockchainProfile,
    Person = require('./lib/schemas/person')

function writeDocFile(filename, data) {
    var fileData = '```json\n' + JSON.stringify(data, null, 4) + '\n```'
    fs.writeFile('docs/' + filename, fileData, function(err) {
        if (!err) {
            console.log(filename + ' written')
        } else {
            console.log(err)
        }
    })
}

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    tokenSigner = new TokenSigner('ES256K', rawPrivateKey),
    tokenVerifier = new TokenVerifier('ES256K', rawPublicKey),
    privateKeychain = new PrivateKeychain(),
    publicKeychain = privateKeychain.publicKeychain()

function testTokening(profile) {
    var tokenRecords = [],
        zoneFile

    test('profileToTokens', function(t) {
        t.plan(2)

        tokenRecords = BlockchainProfile.profileToTokens(profile, privateKeychain)
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
        //console.log(JSON.stringify(tokenRecords, null, 2))
    })

    test('tokensToProfile', function(t) {
        t.plan(2)

        var recoveredProfile = BlockchainProfile.tokensToProfile(tokenRecords, publicKeychain)
        //console.log(recoveredProfile)
        t.ok(recoveredProfile, 'profile should have been reconstructed')
        t.equal(JSON.stringify(recoveredProfile), JSON.stringify(profile), 'profile should equal the reference')
    })
}

function testFlattening() {
    var tokenRecords = [],
        profile = profileDirectory.google_id,
        flatObject

    test('profileToFlatObject', function(t) {
        t.plan(3)

        flatObject = BlockchainProfile.profileToFlatObject(profile)
        t.ok(flatObject, 'flat object should have been created')
        t.equal(flatObject.name, profile.name, 'flat object should have the same name as the profile')
        t.equal(flatObject['address.postalCode'], profile.address.postalCode, 'flat object postal code should match that of the profile')
    })

    test('flatObjectToProfile', function(t) {
        t.plan(1)

        var expandedProfile = BlockchainProfile.flatObjectToProfile(flatObject)
        t.equal(JSON.stringify(expandedProfile), JSON.stringify(profile), 'unflattened object should match the profile')
    })
}

function testFileCreation(objectType, username, profile) {
    var zoneFile, tokenFile, profile

    test('createZoneFile', function(t) {
        t.plan(1)

        var hostUrls = ['https://s3.amazonaws.com/mq9/' + username + '.json']
        var checksums = [{
            field: 'pgp[0].publicKey',
            hash: profileDirectory.pgpPublicKeyHash,
            algorithm: 'SHA256'
        }]
        zoneFile = BlockchainProfile.zoneFile(username, publicKeychain, hostUrls, checksums)
        t.ok(zoneFile, 'zone file should have been created')
        //console.log(JSON.stringify(zoneFile, null, 4))

        writeDocFile(objectType + '/zone-file.md', zoneFile)
    })

    test('createTokenFile', function(t) {
        t.plan(1)

        tokenFile = BlockchainProfile.profileToTokens(profile, privateKeychain)
        t.ok(tokenFile, 'token file should have been created')
        //console.log(JSON.stringify(tokenRecords, null, 4))

        writeDocFile(objectType + '/token-file.md', tokenFile)
    })

    test('reconstructProfile', function(t) {
        t.plan(1)

        profile = BlockchainProfile.tokensToProfile(tokenFile, publicKeychain)
        t.ok(profile, 'profile should have been constructed')
        //console.log(JSON.stringify(profile, null, 4))

        writeDocFile(objectType + '/profile.md', profile)
    })
}

function testLegacyFormat() {
    var v2Profile = profileDirectory.ryan_v2

    test('legacyFormat', function(t) {
        t.plan(1)

        var profile = Person.convertFromLegacyFormat(v2Profile)
        t.ok(profile, 'profile should have been converted')
        //console.log(profile)
    })
}

testTokening(profileDirectory.naval_profile)
testTokening(profileDirectory.google_id)
testFlattening()
testFileCreation('person', 'naval.id', profileDirectory.naval_profile)
testFileCreation('organization', 'google.id', profileDirectory.google_id)
testLegacyFormat()
