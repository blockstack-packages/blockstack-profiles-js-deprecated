'use strict'

var mergeObjects = require('../utils').mergeObjects,
    addOrUpdateItemInList = require('../utils').addOrUpdateItemInList,
    convertPersonFromLegacyFormat = require('../legacy-formats/person'),
    unflattenObject = require('../utils').unflattenObject

var signProfileTokens = require('../tokening').signProfileTokens,
    getProfileFromTokens = require('../tokening').getProfileFromTokens

function Person(profile, context) {
    if (!context) {
        context = "http://schema.org/"
    }
    if (!profile) {
        profile = {
            "@context": context,
            "@type": "Person"
        }
    }
    this.profile = profile
}

Person.fromLegacyFormat = function(legacyProfile) {
    var profile = convertPersonFromLegacyFormat(legacyProfile)
    return new Person(profile)
}

Person.fromFlatObject = function(flatProfile) {
    var profile = unflattenObject(flatProfile)
    return new Person(profile)
}

Person.fromTokens = function(tokenRecords, publicKeychain) {
    var profile = getProfileFromTokens(tokenRecords, publicKeychain)
    return new Person(profile)
}

Person.prototype.setName = function(givenName, familyName) {
    var profileUpdate = {
        name: givenName + " " + familyName,
        givenName: givenName,
        familyName: familyName
    }
    mergeObjects(this.profile, profileUpdate)
}

Person.prototype.setDescription = function(description) {
    this.profile.description = description
}

Person.prototype.setImage = function(name, contentUrl) {
    if (!this.profile.image) {
        this.profile.image = []
    }
    var newImage = {
        "@type": "ImageObject",
        "name": name,
        "contentUrl": contentUrl
    }
    this.profile.image = addOrUpdateItemInList(
        this.profile.image, newImage, ['name'])
}

Person.prototype.setSocialAccount = function(service, username, proofUrl) {
    if (!this.profile.account) {
        this.profile.account = []
    }
    var newAccount = {
        "@type": "Account",
        "service": service,
        "identifier": username,
        "proofType": "http"
    }
    if (proofUrl) {
        newAccount.proofUrl = proofUrl
    }
    this.profile.account = addOrUpdateItemInList(
        this.profile.account, newAccount, ['service', 'identifier'])
}

Person.prototype.setBitcoinAddress = function(address, proofMessage, proofSignature) {
    if (!this.profile.account) {
        this.profile.account = []
    }
    var newAccount = {
        "@type": "Account",
        "service": "bitcoin",
        "role": "payment",
        "identifier": address,
        "proofType": "signature"
    }
    if (proofMessage && proofSignature) {
        newAccount.proofMessage = proofMessage
        newAccount.proofSignature = proofSignature
    }
    this.profile.account = addOrUpdateItemInList(
        this.profile.account, newAccount, ['service', 'identifier'])
}

Person.prototype.setAppRecord = function(service, data) {
    if (!this.profile.account) {
        this.profile.account = []
    }
    var newAccount = {
        "@type": "Account",
        "service": service,
        "role": "storage",
        "data": data
    }
    this.profile.account = addOrUpdateItemInList(
        this.profile.account, newAccount, ['service'])
}

Person.prototype.setWebsite = function(url) {
    if (!this.profile.website) {
        this.profile.website = []
    }
    var newWebsite = {
        "@type": "WebSite",
        "url": url
    }
    this.profile.website = addOrUpdateItemInList(
        this.profile.website, newWebsite, ['url'])
}

Person.prototype.setEmployer = function(organizationId) {
    if (!this.profile.worksFor) {
        this.profile.worksFor = []
    }
    var newEmployer = {
        "@type": "Organization",
        "id": organizationId
    }
    this.profile.worksFor = addOrUpdateItemInList(
        this.profile.worksFor, newEmployer, ['id'])}

Person.prototype.setFriend = function(personId) {
    if (!this.profile.knows) {
        this.profile.knows = []
    }
    var newFriend = {
        "@type": "Person",
        "id": personId
    }
    this.profile.knows = addOrUpdateItemInList(
        this.profile.knows, newFriend, ['id'])
}

Person.prototype.setAddress = function(addressCountry, addressLocality, streetAddress, postalCode) {
    var address = {
        "@type": "PostalAddress",
        "addressLocality": addressLocality
    }
    if (addressCountry) {
        address.addressCountry = addressCountry
    }
    if (streetAddress) {
        address.streetAddress = streetAddress
    }
    if (postalCode) {
        address.postalCode = postalCode
    }
    this.profile.address = address
}

module.exports = Person
