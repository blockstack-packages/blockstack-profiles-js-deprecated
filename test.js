'use strict'

var test = require('tape')

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    sampleInput = require('./index').sampleInput,
    createTokens = require('./index').createTokens,
    reconstructProfile = require('./index').reconstructProfile,
    Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k'),
    tokens = []

test('tokenizeProfile', function(t) {
    t.plan(2)

    tokens = createTokens(sampleInput.ryan, rawPrivateKey, rawPublicKey)
    t.ok(tokens, 'tokens should have been created')

    var tokensVerified = true
    tokens.map(function(token) {
        try {
            tokenizer.verify(token, rawPublicKey)
        } catch(err) {
            console.log(err.stack)
            tokensVerified = false
        }
    })
    t.equal(tokensVerified, true, 'all tokens should be valid')

    // Log decoded tokens
    tokens.map(function(token) {
        console.log(tokenizer.decode(token))
    })
})

test('reconstructProfile', function(t) {
    t.plan(2)

    var profile = reconstructProfile(tokenizer, tokens)
    t.ok(profile, 'profile should have been reconstructed')

    t.equal(profile.name, 'Ryan Shea', 'profile name should match the reference')

    // Log reconstructed profile
    console.log(profile)
})
