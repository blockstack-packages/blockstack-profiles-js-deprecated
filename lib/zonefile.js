'use strict'

function createZoneFile(username, publicKeychain, tokenFileUrls, checksums) {
    // create the base zone file
    var zoneFile = {
        origin: username,
        ttl: '1h',
        records: []
    }

    // create a zone file record for each URL
    tokenFileUrls.map(function(url) {
        zoneFile.records.push({
            name: '@',
            class: 'IN',
            type: 'CNAME',
            data: url,
            publicKeychain: publicKeychain.toString(),
            checksums: checksums
        })
    })

    // return the zone file
    return zoneFile
}

module.exports = createZoneFile
