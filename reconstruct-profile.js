var fs = require('fs')

var filename = './users/ryan/statements.json'

Object.merge = function(destination, source) {
    for (var property in source) {
        // if the property is really valid
        if (source.hasOwnProperty(property)) {
            if (destination.hasOwnProperty(property)) {
                if (Array.isArray(destination[property]) && Array.isArray(source[property])) {
                    // if the propety is a list in both the destination and the source
                    // merge the two lists
                    destination[property] = destination[property].concat(source[property])
                } else {
                    // if the property is not a list, override the previous
                    destination[property] = source[property]
                }
            } else {
                // if the property hasn't been seen yet, just add it in
                destination[property] = source[property]
            }
        }
    }
    return destination
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
        throw err
    }
    var profile = {}
    var items = JSON.parse(data)
    items.map(function(item) {
        var token = item.decodedToken
        var claim = token.payload.claim
        Object.merge(profile, claim)
    })
    console.log(JSON.stringify(profile, null, 4))
})