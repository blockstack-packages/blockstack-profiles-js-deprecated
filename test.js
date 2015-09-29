'use strict'

var test = require('tape')

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    createTokens = require('./index').createTokens,
    reconstructProfile = require('./index').reconstructProfile,
    BlockchainID = require('./index').BlockchainID,
    TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    tokenSigner = new TokenSigner('ES256k', rawPrivateKey),
    tokenVerifier = new TokenVerifier('ES256k', rawPublicKey),
    decodeToken = require('jwt-js').decodeToken,
    tokens = []

var profileDirectory = {
    ryan_id: {
        "givenName": "Ryan",
        "familyName": "Shea",
        "description": "Co-founder of Onename",
        "employer": "onename.id",
        "streetAddress": "154 Grand St",
        "addressLocality": "New York, NY",
        "postalCode": "10013",
        "country": "United States",
        "avatarImageURL": "https://s3.amazonaws.com/kd4/ryan",
        "backgroundImageURL": "https://s3.amazonaws.com/dx3/ryan",
        "twitterUsername": "ryaneshea",
        "twitterProofURL": "https://twitter.com/ryaneshea/status/597815798850269184",
        "facebookUsername": "ryaneshea",
        "facebookProofURL": "https://facebook.com/ryaneshea/posts/10153086767027713",
        "githubUsername": "shea256",
        "githubProofURL": "https://gist.github.com/shea256/8920fd8c54674ef9d9af",
        "linkedinUsername": "ryaneshea",
        "skypeUsername": "ryaneshea",
        "instagramUsername": "ryaneshea",
        "bitcoinAddress": "1NYpGg3hkY6tV4D95fyw8EreWhSsW6u8Cx",
        "bitcoinPublicKey": "035958770dae6bdc0ba2da2bbd0b76045c3fe1b2ff593b76e55515471ddfc9a193",
        "websiteDomain": "shea.io, onename.com",
        "email": "ryan@shea.io",
        "knows": "muneeb.id, glepage.id, brianhoffman.id, judecn.id",
        "worksFor": "onename.com",
        "birthDate": "1990-01-01",
        "taxID": "000-00-0000",
        "authPublicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ",
        "openbazaarGUID": "34e57db64ce7435ab0f759oca31386527c670bd1",
        "pgpKeyURL": "https://s3.amazonaws.com/pk9/ryan",
        "pgpPublicKey": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v1\n\n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\nET6u\n=hvNf\n-----END PGP PUBLIC KEY BLOCK-----",
        "pgpPublicKeyHash": "e508f0c2c455ab79a4fabc4b51aa537e123c08abee40a87c47e6705a2bbae4ae"
    },
    ryan_v2: {
      "github": {
        "username": "shea256", 
        "proof": {
          "url": "https://gist.github.com/shea256/8920fd8c54674ef9d9af"
        }
      }, 
      "auth": [
        {
          "publicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ"
        }
      ], 
      "v": "0.2", 
      "facebook": {
        "username": "ryaneshea", 
        "proof": {
          "url": "https://facebook.com/ryaneshea/posts/10153086767027713"
        }
      }, 
      "bio": "Co-founder of Onename (YC S14, USV). Working on decentralized identity.", 
      "location": {
        "formatted": "New York"
      }, 
      "pgp": {
        "url": "https://s3.amazonaws.com/pk9/ryan", 
        "fingerprint": "1E4329E6634C75730D4D88C0638F2769D55B9837"
      }, 
      "bitcoin": {
        "address": "1LFS37yRSibwbf8CnXeCn5t1GKeTEZMmu9"
      }, 
      "cover": {
        "url": "https://s3.amazonaws.com/dx3/ryan"
      }, 
      "name": {
        "formatted": "Ryan Shea"
      }, 
      "website": "http://shea.io", 
      "avatar": {
        "url": "https://s3.amazonaws.com/kd4/ryan"
      }, 
      "twitter": {
        "username": "ryaneshea", 
        "proof": {
          "url": "https://twitter.com/ryaneshea/status/597815798850269184"
        }
      }
    }
}

test('tokenizeProfile', function(t) {
    t.plan(2)

    tokens = createTokens(tokenSigner, 'ryan.id', profileDirectory.ryan_id)
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

    var profile = reconstructProfile(tokens, tokenVerifier)
    t.ok(profile, 'profile should have been reconstructed')
    t.equal(profile.name, 'Ryan Shea', 'profile name should match the reference')
})

test('blockchainID', function(t) {
    t.plan(4)
    
    var blockchainID = new BlockchainID('ryan.id', profileDirectory.ryan_id)
    t.ok(blockchainID, 'blockchain ID profile object should have been created')

    var hostUrls = ['https://s3.amazonaws.com/md9/ryan.json'],
        checksums = [{ field: 'pgp[0].publicKey', hash: profileDirectory.ryan_id.pgpPublicKeyHash, algorithm: 'SHA256' }],
        zoneFile = blockchainID.zoneFile(hostUrls, checksums)
    t.ok(zoneFile, 'zone file should have been created')
    //console.log(JSON.stringify(zoneFile, null, 4))

    var tokenFile = blockchainID.tokenFile(tokenSigner, rawPrivateKey, rawPublicKey)
    t.ok(tokenFile, 'token file should have been created')

    var profile = blockchainID.profile(tokenSigner, rawPrivateKey, rawPublicKey)
    t.ok(profile, 'profile should have been constructed')
})

test('v2Profile', function(t) {
    t.plan(2)

    var blockchainID = BlockchainID.fromV2Profile('ryan.id', profileDirectory.ryan_v2)
    t.ok(blockchainID, 'blockchain ID object should have been created')

    var profile = blockchainID.profile(tokenSigner)
    t.ok(profile, 'profile should have been created')
})
