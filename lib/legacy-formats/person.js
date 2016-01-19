'use strict'

var hasprop = require('hasprop')

function formatAccount(serviceName, data) {
    var proofUrl
    if (hasprop(data, 'proof.url')) {
        proofUrl = data.proof.url
    }
    return {
        "@type": "Account",
        "service": serviceName,
        "identifier": data.username,
        "proofType": "http",
        "proofUrl": proofUrl
    }
}

function convertPersonProfileFromLegacyFormat(profile) {
    var profileData = {
        "@type": "Person"
    }

    if (hasprop(profile, 'name.formatted')) {
        profileData.name = profile.name.formatted
    }

    if (hasprop(profile, 'bio')) {
        profileData.description = profile.bio
    }

    if (hasprop(profile, 'location.formatted')) {
        profileData.address = {
            "@type": "address",
            "addressLocality": profile.location.formatted
        }
    }

    var images = []
    if (hasprop(profile, 'avatar.url')) {
        images.push({
            "@type": "ImageObject",
            "name": "avatar",
            "contentUrl": profile.avatar.url
        })
    }
    if (hasprop(profile, 'cover.url')) {
        images.push({
            "@type": "ImageObject",
            "name": "cover",
            "contentUrl": profile.cover.url
        })
    }
    if (images.length) {
        profileData.image = images
    }

    if (hasprop(profile, 'website')) {
        profileData.website = [{
            "@type": "WebSite",
            "url": profile.website
        }]
    }

    var accounts = []
    if (hasprop(profile, 'bitcoin.address')) {
        accounts.push({
            "@type": "Account",
            "service": "bitcoin",
            "role": "payment",
            "identifier": profile.bitcoin.address
        })
    }
    if (hasprop(profile, 'twitter.username')) {
        accounts.push(formatAccount('twitter', profile.twitter))
    }
    if (hasprop(profile, 'facebook.username')) {
        accounts.push(formatAccount('facebook', profile.facebook))
    }
    if (hasprop(profile, 'github.username')) {
        accounts.push(formatAccount('github', profile.github))
    }
    profileData.account = accounts

    var keys = []
    if (hasprop(profile, 'auth')) {
        if (profile.auth.length > 0) {
            if (hasprop(profile.auth[0], 'publicKeychain')) {
                keys.push({
                    "@type": "Key",
                    "format": "ecdsa-keychain",
                    "publicKeychain": profile.auth[0].publicKeychain
                })
            }
        }
    }
    if (hasprop(profile, 'pgp.url')) {
        keys.push({
            "@type": "Key",
            "format": "pgp-key",
            "publicKey": profile.pgp.url
        })
    }
    profileData.key = keys

    return profileData
}

module.exports = convertPersonProfileFromLegacyFormat
