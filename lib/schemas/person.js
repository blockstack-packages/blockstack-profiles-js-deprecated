'use strict'

var mergeObjects = require('../utils').mergeObjects,
    addOrUpdateItemInList = require('../utils').addOrUpdateItemInList,
    convertPersonFromLegacyFormat = require('../legacy-formats/person')

function Person(profile) {
    if (!profile) {
        profile = {}        
    }
    this.profile = profile
}

Person.convertFromLegacyFormat = function(profile) {
    return convertPersonFromLegacyFormat(profile)
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

Person.prototype.setAddress = function(addressLocality, addressCountry, streetAddress, postalCode) {
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
