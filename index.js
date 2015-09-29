'use strict'

module.exports = {
    createTokens: require('./lib/tokens').createTokens,
    reconstructProfile: require('./lib/reconstruct'),
    blockchainIdUrl: require('./lib/utils').blockchainIdUrl,
    mergeObjects: require('./lib/utils').mergeObjects,
    BlockchainID: require('./lib/profile')
}
