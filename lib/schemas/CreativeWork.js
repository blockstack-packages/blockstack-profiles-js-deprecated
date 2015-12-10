'use strict'

var dateFormat = require('dateformat')

var addOrUpdateItemInList = require('../utils').addOrUpdateItemInList,
    signProfileTokens = require('../tokening').signProfileTokens,
    getProfileFromTokens = require('../tokening').getProfileFromTokens

function CreativeWork(profile) {
    if (!profile) {
        profile = {
            "@type": "CreativeWork"
        }
    }
    this.profile = profile
}

CreativeWork.fromTokens = function(tokenRecords, publicKeychain) {
    var profile = getProfileFromTokens(tokenRecords, publicKeychain)
    return new CreativeWork(profile)
}

CreativeWork.fromFlatObject = function(flatProfile) {
    var profile = unflattenObject(flatProfile)
    return new CreativeWork(profile)
}

CreativeWork.prototype.setName = function(name) {
    this.profile.name = name
}

CreativeWork.prototype.setDescription = function(description) {
    this.profile.description = description
}

CreativeWork.prototype.setCreator = function(creatorId, creatorName) {
    if (!this.profile.creator) {
        this.profile.creator = []
    }
    var newCreator = {
        "@type": "Person",
        "id": creatorId
    }
    if (creatorName) {
        newCreator.name = creatorName
    }
    this.profile.creator = addOrUpdateItemInList(
        this.profile.creator, newCreator, ['id'])
}

CreativeWork.prototype.setDatePublished = function(date) {
    var isoDate = dateFormat(date, "isoDateTime")
    this.profile.datePublished = isoDate
}

CreativeWork.prototype.setDateCreated = function(date) {
    var isoDate = dateFormat(date, "isoDateTime")
    this.profile.dateCreated = isoDate
}

module.exports = CreativeWork