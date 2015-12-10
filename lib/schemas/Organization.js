'use strict'

var addOrUpdateItemInList = require('../utils').addOrUpdateItemInList

var signProfileTokens = require('../tokening').signProfileTokens,
    getProfileFromTokens = require('../tokening').getProfileFromTokens

function Organization(profile, context) {
    if (!context) {
        context = "http://schema.org/"
    }
    if (!profile) {
        profile = {
            "@context": context,
            "@type": "Organization"
        }
    }
    this.profile = profile
}

Organization.fromTokens = function(tokenRecords, publicKeychain) {
    var profile = getProfileFromTokens(tokenRecords, publicKeychain)
    return new Organization(profile)
}

Organization.fromFlatObject = function(flatProfile) {
    var profile = unflattenObject(flatProfile)
    return new Organization(profile)
}

Organization.prototype.setName = function(name, legalName) {
    this.profile.name = name
    if (legalName) {
        this.profile.legalName = legalName
    }
}

Organization.prototype.setDescription = function(description) {
    this.profile.description = description
}

Organization.prototype.setImage = function(name, contentUrl) {
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

Organization.prototype.setEmail = function(email) {
    this.profile.email = email
}

Organization.prototype.setAddress = function(addressCountry, addressLocality, streetAddress, postalCode) {
    var address = {
        "@type": "PostalAddress"
    }
    if (addressLocality) {
        address.addressLocality = addressLocality
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

Organization.prototype.setEmployee = function(personId, name) {
    if (!this.profile.employee) {
        this.profile.employee = []
    }
    var newEmployee = {
        "@type": "ImageObject",
        "id": personId
    }
    if (name) {
        newEmployee.name = name
    }
    this.profile.employee = addOrUpdateItemInList(
        this.profile.employee, newEmployee, ['id'])
}

module.exports = Organization