'use strict'

var mergeObjects = require('./utils').mergeObjects,
    decodeToken = require('jwt-js').decodeToken,
    hasprop = require('hasprop'),
    blockchainIdUrl = require('./utils').blockchainIdUrl,
    secp256k1 = require('elliptic-curve').secp256k1,
    TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier

function tokensToV3Profile(tokenRecords, publicKeychain, objectType) {
    if (!tokenRecords) {
        throw Error('tokenVerifier and tokens are required')
    }
    if (!objectType) {
        objectType = 'Person'
    }
    var profile = {
        '@type': objectType
    }
    tokenRecords.map(function(tokenRecord) {
        var token = tokenRecord.token,
            decodedToken = decodeToken(token),
            claim = decodedToken.payload.claim,
            publicKey = decodedToken.payload.issuer.publicKey,
            verifyingAlgorithm = decodedToken.header.alg
        if (verifyingAlgorithm === 'ES256') {
            verifyingAlgorithm = 'ES256k'
        }
        var tokenVerifier = new TokenVerifier(verifyingAlgorithm, publicKey)
        if (tokenVerifier) {
            tokenVerifier.verify(token)
        }
        var derivedPublicKey = publicKeychain.descendant(tokenRecord.chainPath).publicKey().toString()
        if (derivedPublicKey !== publicKey) {
            throw Error('derived public key does not match token public key')
        }
        mergeObjects(profile, claim)
    })
    return profile
}

function v3ProfileToFlatProfile(profile) {
    var flatProfile = {}
    if (hasprop(profile, 'name')) {
        flatProfile.name = profile.name
    }
    if (hasprop(profile, 'givenName')) {
        flatProfile.givenName = profile.givenName
    }
    if (hasprop(profile, 'familyName')) {
        flatProfile.familyName = profile.familyName
    }
    if (hasprop(profile, 'description')) {
        flatProfile.description = profile.description
    }
    if (hasprop(profile, 'image')) {
        profile.image.forEach(function(image) {
            if (hasprop(image, 'name') && hasprop(image, 'contentUrl')) {
                if (image.name === 'avatar') {
                    flatProfile.avatarImageUrl = image.contentUrl
                }
                if (image.name === 'background') {
                    flatProfile.backgroundImageUrl = image.contentUrl
                }
            }
        })
    }
    if (hasprop(profile, 'website')) {
        var websites = []
        if (Array.isArray(profile.website)) {
            profile.website.forEach(function(website) {
                if (hasprop(website, 'url')) {
                    websites.push(website.url)
                }
            })
        }
        flatProfile.website = websites.join(', ')
    }
    if (hasprop(profile, 'account')) {
        var appData = []
        profile.account.forEach(function(account) {
            if (hasprop(account, 'service') && hasprop(account, 'identifier')) {
                if (account.service === 'bitcoin') {
                    flatProfile.bitcoinAddress = account.identifier
                    if (hasprop(account, 'proofMessage')) {
                        flatProfile.bitcoinProofMessage = account.proofMessage
                    }
                    if (hasprop(account, 'proofSignature')) {
                        flatProfile.bitcoinProofSignature = account.proofSignature
                    }
                } else {
                    flatProfile[account.service + 'Username'] = account.identifier
                    if (hasprop(account, 'proofUrl')) {
                        flatProfile[account.service + 'ProofUrl'] = account.proofUrl
                    }
                }
            }
            if (hasprop(account, 'service') && hasprop(account, 'data')) {
                appData.push(account.service + '=' + JSON.stringify(account.data))
            }
        })
        flatProfile.appData = appData.join(', ')
    }
    if (hasprop(profile, 'worksFor')) {
        var worksFor = []
        profile.worksFor.forEach(function(organization) {
            if (hasprop(organization, 'id')) {
                worksFor.push(organization.id)
            }
        })
        flatProfile.worksFor = worksFor.join(', ')
    }
    if (hasprop(profile, 'knows')) {
        var people = []
        profile.knows.forEach(function(person) {
            if (hasprop(person, 'id')) {
                people.push(person.id)
            }
        })
        flatProfile.knows = people.join(', ')
    }
    if (hasprop(profile, 'key')) {
        var authPublicKeychains = []
        var pgpPublicKeys = []
        var pgpProofMessages = []
        profile.key.forEach(function(key) {
            if (hasprop(key, 'format') && hasprop(key, 'publicKeychain')) {
                if (key.format === 'ecdsa-keychain') {
                    authPublicKeychains.push(key.publicKeychain)
                }
            }
            if (hasprop(key, 'format') && hasprop(key, 'publicKey')) {
                if (key.format === 'pgp-key') {
                    pgpPublicKeys.push(key.publicKey)
                }
            }
            if (hasprop(key, 'format') && hasprop(key, 'proofMessage')) {
                pgpProofMessages.push(key.proofMessage)
            }
        })
        if (authPublicKeychains.length) {
            flatProfile.authPublicKeychain = authPublicKeychains.join(', ')
        }
        if (pgpPublicKeys.length) {
            flatProfile.pgpPublicKey = pgpPublicKeys.join(', ')
        }
        if (pgpProofMessages.length) {
            flatProfile.pgpProofMessage = pgpProofMessages.join(', ')
        }
    }

    // Private Items
    if (hasprop(profile, 'address')) {
        profile.address.forEach(function(address) {
            if (hasprop(address, 'streetAddress')) {
                flatProfile.streetAddress = address.streetAddress
            }
            if (hasprop(address, 'addressLocality')) {
                flatProfile.addressLocality = address.addressLocality
            }
            if (hasprop(address, 'postalCode')) {
                flatProfile.postalCode = address.postalCode
            }
            if (hasprop(address, 'addressCountry')) {
                flatProfile.addressCountry = address.addressCountry
            }
        })
    }
    if (hasprop(profile, 'birthDate')) {
        flatProfile.birthDate = profile.birthDate
    }
    if (hasprop(profile, 'taxID')) {
        flatProfile.taxID = profile.taxID
    }

    return flatProfile
}

function tokensToFlatProfile(tokens, publicKeychain) {
    var v3Profile = tokensToV3Profile(tokens, publicKeychain)
    return v3ProfileToFlatProfile(v3Profile)
}

function v2ProfileToFlatProfile(profile) {
    var profileData = {}

    if (hasprop(profile, 'name.formatted')) {
        profileData.name = profile.name.formatted
    }
    if (hasprop(profile, 'twitter.username')) {
        profileData.twitterUsername = profile.twitter.username
    }
    if (hasprop(profile, 'twitter.proof.url')) {
        profileData.twitterProofUrl = profile.twitter.proof.url
    }
    if (hasprop(profile, 'facebook.username')) {
        profileData.facebookUsername = profile.facebook.username
    }
    if (hasprop(profile, 'facebook.proof.url')) {
        profileData.facebookProofUrl = profile.facebook.proof.url
    }
    if (hasprop(profile, 'github.username')) {
        profileData.githubUsername = profile.github.username
    }
    if (hasprop(profile, 'github.proof.url')) {
        profileData.githubProofUrl = profile.github.proof.url
    }
    if (hasprop(profile, 'bio')) {
        profileData.description = profile.bio
    }
    if (hasprop(profile, 'location.formatted')) {
        profileData.addressLocality = profile.location.formatted
    }
    if (hasprop(profile, 'bitcoin.address')) {
        profileData.bitcoinAddress = profile.bitcoin.address
    }
    if (hasprop(profile, 'avatar.url')) {
        profileData.avatarImageUrl = profile.avatar.url
    }
    if (hasprop(profile, 'cover.url')) {
        profileData.backgroundImageUrl = profile.cover.url
    }
    if (hasprop(profile, 'auth')) {
        profileData.authPublicKeychain = profile.auth[0].publicKeychain
    }
    if (hasprop(profile, 'website')) {
        profileData.websiteDomain = profile.website.replace('http://', '')
    }

    return profileData
}

function buildNameClaim(data) {
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

function flatProfileToClaims(data) {
    var payloads = []

    if (data.name || data.givenName || data.familyName) {
        payloads.push(buildNameClaim(data))
    }
    if (data.description) {
        payloads.push({
            description: data.description
        })
    }
    if (data.avatarImageUrl) {
        payloads.push({
            image: [{
                '@type': 'ImageObject',
                name: 'avatar',
                contentUrl: data.avatarImageUrl
            }]
        })
    }
    if (data.backgroundImageUrl) {
        payloads.push({
            image: [{
                '@type': 'ImageObject',
                name: 'background',
                contentUrl: data.backgroundImageUrl
            }]
        })
    }
    if (data.website) {
        data.website.split(', ').map(function(website) {
            payloads.push({
                website: [{
                    '@type': 'WebSite',
                    url: website
                }]
            })
        })
    }
    if (data.facebookUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'facebook',
                identifier: data.facebookUsername,
                proofType: 'http',
                proofUrl: data.facebookProofUrl
            }]
        })
    }
    if (data.twitterUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'twitter',
                identifier: data.twitterUsername,
                proofType: 'http',
                proofUrl: data.twitterProofUrl
            }]
        })
    }
    if (data.githubUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'github',
                identifier: data.githubUsername,
                proofType: 'http',
                proofUrl: data.githubProofUrl
            }]
        })
    }
    if (data.linkedinUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'linkedin',
                identifier: data.linkedinUsername,
                proofType: 'http',
                proofUrl: data.linkedinProofUrl
            }]
        })
    }
    if (data.instagramUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'instagram',
                identifier: data.instagramUsername,
                proofType: 'http',
                proofUrl: data.instagramProofUrl
            }]
        })
    }
    if (data.venmoUsername) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'venmo',
                role: 'payment',
                identifier: data.venmoUsername,
            }]
        })
    }
    if (data.bitcoinAddress) {
        payloads.push({
            account: [{
                '@type': 'Account',
                service: 'bitcoin',
                role: 'payment',
                identifier: data.bitcoinAddress,
                proofType: 'signature',
                proofMessage: data.bitcoinProofMessage,
                proofSignature: data.bitcoinProofSignature
            }]
        })
    }
    if (data.appData) {
        data.appData.split(', ').map(function(app) {
            var parts = app.split('=')
            if (parts.length === 2) {
                var appName = parts[0],
                    appData = JSON.parse(parts[1])
                payloads.push({
                    account: [{
                        '@type': 'Account',
                        service: appName,
                        role: 'storage',
                        data: appData
                    }]
                })
            }
        })
    }
    if (data.worksFor) {
        data.worksFor.split(', ').map(function(organizationID) {
            payloads.push({
                worksFor: [{
                    '@type': 'Organization',
                    id: organizationID
                }]
            })
        })
    }
    if (data.knows) {
        data.knows.split(', ').map(function(friendUsername) {
            payloads.push({
                knows: [{
                    '@type': 'Person',
                    id: friendUsername
                }]
            })
        })
    }
    if (data.authPublicKeychain) {
        var authKeyNames = []
        var authPublicKeychains = data.authPublicKeychain.split(', ')
        for (var i = 0; i < authPublicKeychains.length; i++) {
            var keyName = 'ecdsa-keychain-' + String(i)
            authKeyNames.push(keyName)
            payloads.push({
                key: [{
                    '@type': 'Key',
                    format: 'ecdsa-keychain',
                    name: keyName,
                    publicKeychain: authPublicKeychains[i]
                }]
            })
        }
        payloads.push({
            policy: [{
                '@type': 'Policy',
                role: 'authentication',
                keys: authKeyNames.join(' && ')
            }]
        })
    }
    if (data.pgpPublicKey) {
        var keyNames = [],
            keyName = 'pgp-key-0'
        payloads.push({
            key: [{
                '@type': 'Key',
                format: 'pgp-key',
                name: keyName,
                publicKey: data.pgpPublicKey,
                proofMessage: data.pgpProofMessage
            }]
        })
        keyNames.push(keyName)
        payloads.push({
            policy: [{
                '@type': 'Policy',
                role: 'decryption',
                keys: keyNames.join(' || ')
            }]
        })
    }

    // Private Items
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
                addressCountry: data.addressCountry
            }]
        })
    }
    return payloads
}

function flatProfileToV3Profile(flatProfile) {
    var claims = flatProfileToClaims(flatProfile)
    var profile = {
        '@type': 'Person'
    }
    claims.map(function(claim) {
        mergeObjects(profile, claim)
    })
    return profile
}

function signProfileTokens(signingAlgorithm, privateKeychain, flatProfile) {
    if (signingAlgorithm !== 'ES256k') {
        throw Error('signing algorithm not supported')
    }

    var tokenRecords = []

    var claims = flatProfileToClaims(flatProfile)
    claims.map(function(claim) {
        var secretHash = privateKeychain.secretHash(JSON.stringify(claim)),
            privateKey = privateKeychain.descendant(secretHash).privateKey().toString()

        var tokenSigner = new TokenSigner(signingAlgorithm, privateKey),
            publicKey = secp256k1.getPublicKey(privateKey)

        var payload = {
            claim: claim,
            subject: {
                '@type': 'Person',
                publicKey: publicKey
            },
            issuer: {
                '@type': 'Person',
                publicKey: publicKey
            }
        }
        var token = tokenSigner.sign(payload),
            tokenRecord = {
            token: token,
            data: decodeToken(token),
            chainPath: secretHash,
            encrypted: false
        }
        tokenRecords.push(tokenRecord)
    })

    return tokenRecords
}

module.exports = {
    v2ProfileToFlatProfile: v2ProfileToFlatProfile,
    v3ProfileToFlatProfile: v3ProfileToFlatProfile,
    tokensToFlatProfile: tokensToFlatProfile,
    tokensToV3Profile: tokensToV3Profile,
    flatProfileToV3Profile: flatProfileToV3Profile,
    signProfileTokens: signProfileTokens
}
