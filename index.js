'use strict'

var formatting = require('./lib/formatting')

module.exports = {
    BlockchainID: require('./lib/blockchain-id'),
    formatting: require('./lib/formatting'),
    blockchainIdUrl: require('./lib/utils').blockchainIdUrl,
    mergeObjects: require('./lib/utils').mergeObjects,
    // formatting functions
    v2ProfileToFlatProfile: formatting.v2ProfileToFlatProfile,
    v3ProfileToFlatProfile: formatting.v3ProfileToFlatProfile,
    tokensToFlatProfile: formatting.tokensToFlatProfile,
    tokensToV3Profile: formatting.tokensToV3Profile,
    flatProfileToV3Profile: formatting.flatProfileToV3Profile,
    signProfileTokens: formatting.signProfileTokens
}
