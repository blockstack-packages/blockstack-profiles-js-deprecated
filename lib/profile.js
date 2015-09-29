'use strict'

var createTokens = require('./tokens').createTokens,
    reconstructProfile = require('./reconstruct'),
    decodeToken = require('jwt-js').decodeToken,
    hasprop = require('hasprop')

function BlockchainID(username, profileData) {
    this.username = username
    this.profileData = profileData
}

BlockchainID.prototype.tokenFile = function(tokenSigner) {
    // create the tokens
    var tokens = createTokens(tokenSigner, this.username, this.profileData),
        tokenFile = []

    // add in the token records
    tokens.map(function(token) {
        tokenFile.push({
            token: token,
            data: decodeToken(token),
            encrypted: false
        })
    })
    return tokenFile
}

BlockchainID.prototype.zoneFile = function(tokenFileUrls, checksums) {
    var zoneFile = {
        origin: this.username,
        ttl: '1h',
        records: []
    }

    tokenFileUrls.map(function(url) {
        zoneFile.records.push({
            name: '@',
            class: 'IN',
            type: 'CNAME',
            data: url,
            checksums: checksums
        })
    })

    return zoneFile
}

BlockchainID.prototype.profile = function(tokenSigner) {
    var tokens = createTokens(tokenSigner, this.username, this.profileData)
    return reconstructProfile(tokens)
}

BlockchainID.fromV2Profile = function(username, profile) {
    var profileData = {}

    if (hasprop(profile, 'name.formatted')) {
        profileData.name = profile.name.formatted
    }
    if (hasprop(profile, 'twitter.username')) {
        profileData.twitterUsername = profile.twitter.username
    }
    if (hasprop(profile, 'twitter.proof.url')) {
        profileData.twitterProofURL = profile.twitter.proof.url
    }
    if (hasprop(profile, 'facebook.username')) {
        profileData.facebookUsername = profile.facebook.username
    }
    if (hasprop(profile, 'facebook.proof.url')) {
        profileData.facebookProofURL = profile.facebook.proof.url
    }
    if (hasprop(profile, 'github.username')) {
        profileData.githubUsername = profile.github.username
    }
    if (hasprop(profile, 'github.proof.url')) {
        profileData.githubProofURL = profile.github.proof.url
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
        profileData.avatarImageURL = profile.avatar.url
    }
    if (hasprop(profile, 'cover.url')) {
        profileData.backgroundImageURL = profile.cover.url
    }
    if (hasprop(profile, 'auth')) {
        profileData.authPublicKeychain = profile.auth[0].publicKeychain
    }
    if (hasprop(profile, 'website')) {
        profileData.websiteDomain = profile.website.replace('http://', '')
    }

    return new BlockchainID(username, profileData)
}

module.exports = BlockchainID
