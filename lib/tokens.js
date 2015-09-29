'use strict'

var blockchainIdUrl = require('./utils').blockchainIdUrl

function buildName(data) {
    var name = null
    if (data.name) {
        name = data.name
    } else {
        if (data.givenName) {
            name = data.givenName
        }
        if (data.familyName) {
            name = name + ' ' + data.familyName
        }
    }
    return {
        name: name,
        givenName: data.givenName,
        familyName: data.familyName
    }
}

function createProfileStatements(data) {
    var payloads = []

    if (data.name || data.givenName || data.familyName) {
        payloads.push(buildName(data))
    }
    if (data.description) {
        payloads.push({
            description: data.description
        })
    }
    if (data.worksFor) {
        payloads.push({
            worksFor: [{
                '@type': 'Organization',
                url: blockchainIdUrl(data.employer)
            }]
        })
    }
    if (data.avatarURL) {
        payloads.push({
            image: [{
                '@type': 'ImageObject',
                name: 'avatar',
                contentUrl: data.avatarImageURL
            }]
        })
    }
    if (data.backgroundURL) {
        payloads.push({
            image: [{
                '@type': 'ImageObject',
                name: 'background',
                contentUrl: data.backgroundImageURL
            }]
        })
    }
    if (data.websiteDomain) {
        data.websiteDomain.split(', ').map(function(domain) {
            payloads.push({
                website: [{
                    '@type': 'WebSite',
                    url: 'http://' + domain
                }]
            })
        })
    }
    if (data.facebookUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'facebook',
                username: data.facebookUsername,
                proofURL: data.facebookProofURL
            }]
        })
    }
    if (data.twitterUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'twitter',
                username: data.twitterUsername,
                proofURL: data.twitterProofURL
            }]
        })
    }
    if (data.githubUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'github',
                username: data.githubUsername,
                proofURL: data.githubProofURL
            }]
        })
    }
    if (data.linkedinUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'linkedin',
                username: data.linkedinUsername
            }]
        })
    }
    if (data.instagramUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'instagram',
                username: data.instagramUsername
            }]
        })
    }
    if (data.bitcoinAddress) {
        payloads.push({
            payment: [{
                '@type': 'PaymentMethod',
                method: 'cryptocurrency.bitcoin.address',
                address: data.bitcoinAddress
            }]
        })
    }
    if (data.birthDate) {
        payloads.push({
            birthDate: data.birthDate
        })
    }
    if (data.taxID) {
        payloads.push({
            taxID: data.taxID
        })
    }
    if (data.streetAddress || data.addressLocality || data.postalCode || data.country) {
        payloads.push({
            address: [{
                '@type': 'PostalAddress',
                streetAddress: data.streetAddress,
                addressLocality: data.addressLocality,
                postalCode: data.postalCode,
                addressCountry: data.country
            }]
        })
    }
    if (data.knows) {
        data.knows.split(', ').map(function(friendUsername) {
            payloads.push({
                knows: [{
                    '@type': 'Person',
                    url: blockchainIdUrl(friendUsername)
                }]
            })
        })
    }
    if (data.pgpPublicKey) {
        payloads.push({
            key: [{
                '@type': 'Key',
                format: 'pgp',
                publicKey: data.pgpPublicKey
            }]
        })
    }
    return payloads
}

var createTokens = function(tokenSigner, username, inputData) {
    var tokens = []

    var subject = {
        '@type': 'Person',
        url: blockchainIdUrl(username)
    }

    var issuer = {
        '@type': 'Person',
        url: blockchainIdUrl(username)
    }

    var statements = createProfileStatements(inputData)

    statements.map(function(statement) {
        var payload = {
            claim: statement,
            subject: subject,
            issuer: issuer
        }
        var token = tokenSigner.sign(payload)
        tokens.push(token)
    })

    return tokens
}

module.exports = {
    createProfileStatements: createProfileStatements,
    createTokens: createTokens
}
