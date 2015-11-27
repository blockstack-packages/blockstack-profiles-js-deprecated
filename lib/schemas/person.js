'use strict'

var mergeObjects = require('../utils').mergeObjects,
    addOrUpdateItemInList = require('../utils').addOrUpdateItemInList,
    convertPersonFromLegacyFormat = require('../legacy-formats/person')

function Person() {
    this.profile = {}
}

Person.convertFromLegacyFormat = function(profile) {
    return convertPersonFromLegacyFormat(profile)
}

Person.prototype.setName = function(givenName, familyName) {
    var profile = this.profile
    var profileUpdate = {
        name: givenName + " " + familyName,
        givenName: givenName,
        familyName: familyName
    }
    mergeObjects(profile, profileUpdate)
    this.profile = profile
}

Person.prototype.setSocialAccount = function(service, identifier, proofUrl) {
    var profile = this.profile
    if (!profile.account) {
        profile.account = []
    }
    var newAccount = {
        "@type": "Account",
        "service": service,
        "identifier": identifier,
        "proofType": "http"
    }
    if (proofUrl) {
        newAccount.proofUrl = proofUrl
    }
    var accountList = addOrUpdateItemInList(
        profile.account, newAccount, ['service', 'identifier'])
    profile.account = accountList
    this.profile = profile
}

Person.prototype.setImage = function(name, contentUrl) {
    var profile = this.profile
    if (!profile.image) {
        profile.image = []
    }
    var newImage = {
        "@type": "ImageObject",
        "name": name,
        "contentUrl": contentUrl
    }
    var imageList = addOrUpdateItemInList(profile.image, newImage, ['name'])
    profile.image = imageList
    this.profile = profile
}

module.exports = Person
