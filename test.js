'use strict'

var test = require('tape'),
    fs = require('fs')

var TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    decodeToken = require('jwt-js').decodeToken,
    PrivateKeychain = require('keychain-manager').PrivateKeychain,
    PublicKeychain = require('keychain-manager').PublicKeychain,
    dateFormat = require('dateformat')

var profileDirectory = require('./sample-data')

var Person = require('./index').Person,
    Organization = require('./index').Organization,
    CreativeWork = require('./index').CreativeWork,
    createZoneFile = require('./index').createZoneFile,
    signProfileTokens = require('./index').signProfileTokens,
    getProfileFromTokens = require('./index').getProfileFromTokens,
    flattenObject = require('./index').flattenObject,
    unflattenObject = require('./index').unflattenObject

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

        tokenRecords = signProfileTokens(profile, privateKeychain)
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

        var recoveredProfile = getProfileFromTokens(tokenRecords, publicKeychain)
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
        t.plan(4)

        flatObject = flattenObject(profile)
        t.ok(flatObject, 'flat object should have been created')
        t.equal(flatObject.name, profile.name, 'flat object should have the same name as the profile')
        t.equal(flatObject['address.postalCode'], profile.address.postalCode, 'flat object postal code should match that of the profile')

        var expandedProfile = unflattenObject(flatObject)
        t.equal(JSON.stringify(expandedProfile), JSON.stringify(profile), 'unflattened object should match the profile')
    })

    test('flatObjectToProfile', function(t) {
        t.plan(2)

        var expandedProfile = unflattenObject(profileDirectory.ryan_flat)
        t.ok(expandedProfile, 'profile should have been expanded')
        t.equal(expandedProfile.account.length, 1, 'expanded profile should have 1 account')
    })
}

function testFileCreation(objectType, username, profile, checksums) {
    var zoneFile, tokenFile, profile

    test('createZoneFile', function(t) {
        t.plan(1)

        var hostUrls = ['https://s3.amazonaws.com/mq9/' + username + '.json']
        zoneFile = createZoneFile(username, publicKeychain, hostUrls, checksums)
        t.ok(zoneFile, 'zone file should have been created')
        //console.log(JSON.stringify(zoneFile, null, 4))

        writeDocFile(objectType + '/zone-file.md', zoneFile)
    })

    test('createTokenFile', function(t) {
        t.plan(1)

        tokenFile = signProfileTokens(profile, privateKeychain)
        t.ok(tokenFile, 'token file should have been created')
        //console.log(JSON.stringify(tokenRecords, null, 4))

        writeDocFile(objectType + '/token-file.md', tokenFile)
    })

    test('reconstructProfile', function(t) {
        t.plan(1)

        profile = getProfileFromTokens(tokenFile, publicKeychain)
        t.ok(profile, 'profile should have been constructed')
        //console.log(JSON.stringify(profile, null, 4))

        writeDocFile(objectType + '/profile.md', profile)
    })
}

function testLegacyFormat() {
    var v2Profile = profileDirectory.ryan_v2

    test('legacyFormat', function(t) {
        t.plan(1)

        var person = Person.fromLegacyFormat(v2Profile)
        t.ok(person.profile, 'profile should have been converted')
        //console.log(profile)
    })
}

function testPersonProfile() {
    var person

    test('createPerson', function(t) {
        t.plan(2)
        person = new Person()
        t.ok(person, 'person should have been created')
        t.ok(person.profile, 'profile should have been created')
    })

    test('setName', function(t) {
        t.plan(1)
        person.setName('Ryan', 'Shea')
        t.equal(person.profile.name, 'Ryan Shea', 'profile name should have been properly set')
    })

    test('setDescription', function(t) {
        t.plan(1)
        person.setDescription('Co-founder of Onename')
        t.ok(person.profile.description, 'description should have been set')
    })

    test('setImage', function(t) {
        t.plan(1)
        person.setImage('avatar', 'https://s3.amazonaws.com/kd4/ryan')
        t.equal(person.profile.image[0].name, 'avatar', 'image name should have been properly set')
    })

    test('setSocialAccount', function(t) {
        t.plan(5)

        var facebookProofUrl = 'https://facebook.com/ryaneshea/posts/10153086767027713',
            twitterProofUrl = 'https://twitter.com/ryaneshea/status/597815798850269184'

        person.setSocialAccount('twitter', 'ryaneshea')
        person.setSocialAccount('facebook', 'ryaneshea')
        person.setSocialAccount('github', 'shea256')
        person.setSocialAccount('facebook', 'ryaneshea', facebookProofUrl)
        person.setSocialAccount('twitter', 'ryaneshea', twitterProofUrl)

        t.equal(person.profile.account.length, 3, 'there should be 3 accounts')
        t.equal(person.profile.account[0].service, 'twitter', 'twitter account should have been set')
        t.equal(person.profile.account[0].proofUrl, twitterProofUrl, 'twitter proof url should have been set')
        t.equal(person.profile.account[1].service, 'facebook', 'facebook account should have been set')
        t.equal(person.profile.account[1].proofUrl, facebookProofUrl, 'facebook proof url should have been set')
    })

    test('setBitcoinAddress', function(t) {
        t.plan(3)
        var bitcoinAddress = '14zHpYa8Y1JPVvw1hoC9SqpqHjwu8PC53P',
            proofMessage = 'Verifying that +ryan is my blockchain ID.',
            proofSignature = 'ICuRA+Dq5Dn8AiY9P+mcLzGyibPgG0ec9CphtMk512uPdB5eAncDSHhQZY/7kycvl6PLFEuR+j3OM/K2Vey1+EU='
        person.setBitcoinAddress(bitcoinAddress)
        person.setBitcoinAddress(bitcoinAddress, proofMessage, proofSignature)
        t.equal(person.profile.account.length, 4, 'there should be 4 accounts')
        t.equal(person.profile.account[3].identifier, bitcoinAddress, 'bitcoin address should have been set')
        t.equal(person.profile.account[3].proofMessage, proofMessage, 'proof message should have been set')
    })

    test('setAppRecord', function(t) {
        t.plan(2)
        person.setAppRecord('openbazaar', {'guid': '34e57db64ce7435ab0f759oca31386527c670bd1'})
        t.equal(person.profile.account.length, 5, 'there should be 5 accounts')
        t.ok(person.profile.account[4])
    })

    test('setWebsite', function(t) {
        t.plan(1)
        person.setWebsite('shea.io')
        t.ok(person.profile.website, 'website should have been set')
    })

    test('setEmployer', function(t) {
        t.plan(1)
        person.setEmployer('onename.id')
        person.setEmployer('blockstack.id')
        t.equal(person.profile.worksFor.length, 2, 'there should be 2 employers')
    })

    test('setFriend', function(t) {
        t.plan(1)
        person.setFriend('muneeb.id')
        person.setFriend('naval.id')
        t.equal(person.profile.knows.length, 2, 'there should be 2 friends')
    })

    test('setAddress', function(t) {
        t.plan(2)
        person.setAddress('United States', 'New York, NY')
        t.ok(person.profile.address, 'address should have been set')
        t.equal(person.profile.address.addressLocality, 'New York, NY', 'address locality should have been properly set')
    })

    test('fromLegacyFormat', function(t) {
        t.plan(1)
        var person = Person.fromLegacyFormat(profileDirectory.ryan_v2)
        t.ok(person.profile, 'person profile should have been created')
        //console.log(person.profile)
    })

    test('fromFlatObject', function(t) {
        t.plan(1)
        var person = Person.fromFlatObject(profileDirectory.ryan_flat)
        t.ok(person.profile, 'person profile should have been created')
        //console.log(person.profile)
    })

}

function testOrganizationProfile() {
    var organization

    test('createOrganization', function(t) {
        t.plan(2)
        organization = new Organization()
        t.ok(organization, 'organization should have been created')
        t.ok(organization.profile, 'profile should have been created')
    })

    test('setName', function(t) {
        t.plan(1)
        organization.setName('Google', 'Google Inc.')
        t.equal(organization.profile.name, 'Google', 'profile name should have been properly set')
    })

    test('setDescription', function(t) {
        t.plan(1)
        organization.setDescription('An American multinational technology company specializing in Internet-related services and products.')
        t.ok(organization.profile.description, 'description should have been set')
    })

    test('setImage', function(t) {
        t.plan(1)
        organization.setImage('logo', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
        t.equal(organization.profile.image[0].name, 'logo', 'image name should have been properly set')
    })

    test('setEmail', function(t) {
        t.plan(1)
        organization.setEmail('hello@google.com')
        t.equal(organization.profile.email, 'hello@google.com', 'email should have been set')
    })

    test('setAddress', function(t) {
        t.plan(2)
        organization.setAddress('United States', 'Mountain View, CA', '1600 Amphitheatre Parkway', '94043')
        t.ok(organization.profile.address, 'address should have been set')
        t.equal(organization.profile.address.addressLocality, 'Mountain View, CA', 'address locality should have been properly set')
    })

    test('setEmployee', function(t) {
        t.plan(2)
        organization.setEmployee('larrypage.id')
        organization.setEmployee('sergeybrin.id')
        t.ok(organization.profile.employee, 'employee list should have been created')
        t.equal(organization.profile.employee.length, 2, 'there should be 2 employees')
    })
}

function testCreativeWorkProfile() {
    var creativeWork

    test('createCreativeWork', function(t) {
        t.plan(2)
        creativeWork = new CreativeWork()
        t.ok(creativeWork, 'creative work should have been created')
        t.ok(creativeWork.profile, 'profile should have been created')
    })

    test('setName', function(t) {
        t.plan(1)
        creativeWork.setName('Balloon Dog')
        t.equal(creativeWork.profile.name, 'Balloon Dog', 'profile name should have been properly set')
    })

    test('setCreator', function(t) {
        t.plan(2)
        creativeWork.setCreator('therealjeffkoons.id')
        t.ok(creativeWork.profile.creator, 'creator list should have been created')
        t.equal(creativeWork.profile.creator.length, 1, 'there should be 1 creator')
    })

    test('setDateCreated', function(t) {
        t.plan(2)
        creativeWork.setDateCreated('May 9 1994')
        t.ok(creativeWork.profile.dateCreated, 'date created should have been set')
        t.equal(creativeWork.profile.dateCreated.slice(0, -5), '1994-05-09T00:00:00', 'date created should be equal to reference')
    })

    test('setDatePublished', function(t) {
        t.plan(2)
        var datePublished = new Date()
        creativeWork.setDatePublished(datePublished)
        t.ok(creativeWork.profile.datePublished, 'date published should have been set')
        t.equal(creativeWork.profile.datePublished, dateFormat(datePublished, 'isoDateTime'), 'date published should be equal to reference')
    })
}

testPersonProfile()
testOrganizationProfile()
testCreativeWorkProfile()

testTokening(profileDirectory.naval_profile)
testTokening(profileDirectory.google_id)
testTokening(profileDirectory.balloondog_art)

testFlattening()

testFileCreation('Person', 'naval.id', profileDirectory.naval_profile, profileDirectory.navalChecksums)
testFileCreation('Organization', 'google.id', profileDirectory.google_id, [])
testFileCreation('CreativeWork', 'balloondog.art', profileDirectory.balloondog_art, [])

testLegacyFormat()
