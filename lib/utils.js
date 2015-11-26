'use strict'

var flattenObject = function(data) {
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

var unflattenObject = function(data) {
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

module.exports = {
    flattenObject: flattenObject,
    unflattenObject: unflattenObject
}