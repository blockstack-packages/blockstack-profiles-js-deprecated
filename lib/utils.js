'use strict'

var mergeObjects = require('merge-objects')

function flattenObject(data) {
    var result = {}

    function recurse (currentObject, key) {
        if (Object(currentObject) !== currentObject) {
            // The current object isn't an object or an array
            result[key] = currentObject
        } else if (Array.isArray(currentObject)) {
            // The current object is an array
            for (var i = 0, l = currentObject.length; i < l; i++) {
                recurse(currentObject[i], key + "[" + i + "]")                
            }
            if (l == 0) {
                result[key] = []
            }
        } else {
            // The current object is a non-array object
            var isEmpty = true            
            for (var subKey in currentObject) {
                isEmpty = false
                recurse(currentObject[subKey], key ? key + "." + subKey : subKey)
            }
            if (isEmpty && key) {
                result[key] = {}
            }
        }
    }

    recurse(data, "")

    // Return the result
    return result
}

function unflattenObject(data) {
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        finalObject = {}

    // If the object isn't an object, or if it is an array, then return
    if (Object(data) !== data || Array.isArray(data)) {
        return data
    }

    for (var fullKey in data) {
        var currentObject = finalObject,
            subKey = "",
            currentKey

        while (currentKey = regex.exec(fullKey)) {
            currentObject = currentObject[subKey] || (currentObject[subKey] = (currentKey[2] ? [] : {}))
            subKey = currentKey[2] || currentKey[1]
        }
        
        currentObject[subKey] = data[fullKey]
    }

    // Return the result
    return finalObject[""] || finalObject
}

function addOrUpdateItemInList(list, newItem, itemPrimaryKeys) {
    var existingItem = null
    list.forEach(function(item) {
        var match = true
        itemPrimaryKeys.forEach(function(itemPrimaryKey) {
            if (item[itemPrimaryKey] !== newItem[itemPrimaryKey]) {
                match = false
            }
        })
        if (match) {
            existingItem = item
        }
    })
    if (existingItem) {
        mergeObjects(existingItem, newItem)
    } else {
        list.push(newItem)
    }
    return list
}


module.exports = {
    mergeObjects: mergeObjects,
    flattenObject: flattenObject,
    unflattenObject: unflattenObject,
    addOrUpdateItemInList: addOrUpdateItemInList
}
