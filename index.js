'use strict'

var formatting = require('./lib/formatting')

module.exports = {
    BlockchainID: require('./lib/blockchain-id'),
    formatting: require('./lib/formatting'),
    blockchainIdUrl: require('./lib/utils').blockchainIdUrl,
    mergeObjects: require('./lib/utils').mergeObjects,
    signProfileTokens: require('./lib/formatting').signProfileTokens
}
