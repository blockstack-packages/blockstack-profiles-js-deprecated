var BlockchainID = require('./index').BlockchainID,
    Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k')

var privateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    publicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69',
    username = 'ryan.id',
    profileDirectory = {
        ryan_id: {
            "givenName": "Ryan",
            "familyName": "Shea",
            "bio": "Co-founder of Onename",
            "employer": "onename",
            "streetAddress": "5 Idar Ct Unit A",
            "addressLocality": "Greenwich, CT",
            "postalCode": "10003",
            "country": "United States",
            "avatarURL": "https://s3.amazonaws.com/kd4/ryan",
            "backgroundURL": "https://s3.amazonaws.com/dx3/ryan",
            "twitterUsername": "ryaneshea",
            "twitterProofURL": "https://twitter.com/ryaneshea/status/597815798850269184",
            "facebookUsername": "ryaneshea",
            "facebookProofURL": "https://facebook.com/ryaneshea/posts/10153086767027713",
            "githubUsername": "shea256",
            "githubProofURL": "https://gist.github.com/shea256/8920fd8c54674ef9d9af",
            "linkedinUsername": "ryaneshea",
            "skypeUsername": "ryaneshea",
            "instagramUsername": "ryaneshea",
            "bitcoinAddress": "1NYpGg3hkY6tV4D95fyw8EreWhSsW6u8Cx",
            "bitcoinPublicKey": "035958770dae6bdc0ba2da2bbd0b76045c3fe1b2ff593b76e55515471ddfc9a193",
            "websiteDomain": "shea.io, onename.com",
            "email": "ryan@shea.io",
            "knows": "muneeb, glepage, brianhoffman, judecn",
            "worksFor": "onename.com",
            "birthDate": "1990-01-01",
            "taxID": "000-00-0000",
            "authPublicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ",
            "openbazaarGUID": "34e57db64ce7435ab0f759oca31386527c670bd1"
        }
    }

if (process.argv.length > 3) {
    var command = process.argv[2]
    var username = process.argv[3]
    var profileData = {}

    if (username === 'ryan.id') {
        profileData = profileDirectory.ryan_id
    }
    
    var blockchainID = new BlockchainID(username, profileData)

    if (command === 'tokenfile') {
        var tokenFile = blockchainID.tokenFile(tokenizer, privateKey, publicKey)
        console.log(JSON.stringify(tokenFile, null, 4))
    } else if (command === 'zonefile') {
        var zoneFile = blockchainID.zoneFile(['https://s3.amazonaws.com/md9/ryan.json'])
        console.log(JSON.stringify(zoneFile, null, 4))
    } else if (command === 'profile') {
        var profile = blockchainID.profile(tokenizer, privateKey, publicKey)
        console.log(profile)
    }
} else {
    throw 'Not enough arguments'
}