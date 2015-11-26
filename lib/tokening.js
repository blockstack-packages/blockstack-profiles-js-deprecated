var TokenSigner = require('jwt-js').TokenSigner,
    TokenVerifier = require('jwt-js').TokenVerifier,
    secp256k1 = require('elliptic-curve').secp256k1,
    decodeToken = require('jwt-js').decodeToken,
    mergeObjects = require('merge-objects'),
    flattenObjectNonrecursive = require('./utils').flattenObjectNonrecursive

function profileToAttributes(profile) {
    var attributes = []
    
    Object.keys(profile).forEach(function(key) {
        var value = profile[key]

        if (Array.isArray(value)) {
            var array = value
            for (var i = 0; i < array.length; i++) {
                var item = [array[i]]
                attributes.push([key + '[' + i + ']', item])
            }
        } else {
            attributes.push([key, value])
        }
    })

    return attributes 
}

function tokensToProfile(tokenRecords, publicKeychain) {
    var profile = {}

    tokenRecords.map(function(tokenRecord) {
        var token = tokenRecord.token,
            chainPath = tokenRecord.chainPath,
            decodedToken = decodeToken(token),
            attribute = decodedToken.payload.attribute,
            publicKey = tokenRecord.publicKey,
            verifyingAlgorithm = decodedToken.header.alg

        var tokenVerifier = new TokenVerifier(verifyingAlgorithm, publicKey)
        if (tokenVerifier) {
            tokenVerifier.verify(token)
        } else {
            throw Error('Invalid token verifier')
        }

        var decendantKeychain = publicKeychain.descendant(chainPath),
            derivedPublicKey = decendantKeychain.publicKey().toString()
        if (derivedPublicKey !== publicKey) {
            throw Error('derived public key does not match token public key')
        }

        mergeObjects(profile, attribute)
    })

    return profile
}

function profileToTokens(profile, privateKeychain, signingAlgorithm) {
    if (!signingAlgorithm) {
        signingAlgorithm = 'ES256K'
    }

    var ellipticCurve
    if (signingAlgorithm === 'ES256K') {
        ellipticCurve = secp256k1
    } else {
        throw Error('signing algorithm not supported')
    }

    var tokenRecords = []

    var attributes = profileToAttributes(profile)

    attributes.map(function(attribute) {
        var attributeIdentifier = attribute[0],
            attributeValue = attribute[1],
            secretHash = privateKeychain.secretHash(attributeIdentifier),
            privateKey = privateKeychain.descendant(secretHash).privateKey().toString()

        var tokenSigner = new TokenSigner(signingAlgorithm, privateKey),
            publicKey = ellipticCurve.getPublicKey(privateKey)

        var currentDate = new Date()
        var expirationDate = new Date()
        expirationDate.setYear(expirationDate.getFullYear() + 1)

        var attributeObject = {}
        attributeObject[attributeIdentifier.split('[')[0]] = attributeValue

        var payload = {
            attribute: attributeObject,
            subject: '@self',
            issuer: '@self',
            issuedAt: currentDate,
            expiresAt: expirationDate
        }
        var token = tokenSigner.sign(payload)
        var tokenRecord = {
            token: token,
            data: decodeToken(token),
            chainPath: secretHash,
            encrypted: false,
            publicKey: publicKey
        }
        tokenRecords.push(tokenRecord)
    })

    return tokenRecords
}

module.exports = {
    profileToTokens: profileToTokens,
    tokensToProfile: tokensToProfile
}
