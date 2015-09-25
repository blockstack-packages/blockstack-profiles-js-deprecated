'use strict'

var regexes = {
    numeric: /^[0-9]+$/,
    postalCode: /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
    username: /^[a-z0-9_\-]+$/,
    fingerprint: /^[0-9a-fA-F\s]+$/,
    bitcoinAddress: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
    domain: /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
    uri: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
}

module.exports = regexes