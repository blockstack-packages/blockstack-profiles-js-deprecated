'use strict'

function createProfilePayloads(data, type) {
  var payloads = []
  if (type === 'name') {
     payloads.push({
      name: data.givenName + ' ' + data.familyName,
      givenName: data.givenName,
      familyName: data.familyName
    })
  } else if (type === 'address') {
    payloads.push({
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.streetAddress,
        addressLocality: data.addressLocality,
        postalCode: data.postalCode,
        addressCountry: data.country
      }
    })
  } else if (type === 'bio') {
    payloads.push({
      bio: data.bio
    })
  } else if (type === 'avatar') {
    payloads.push({
      image: data.avatarURI
    })
  } else if (type === 'website') {
    data.websiteDomain.split(',').map(function(domain) {
      payloads.push({
        domain: domain.replace(/ /g,'')
      })
    })
  } else if (type === 'facebook') {
    payloads.push({
      account: {
        service: 'facebook',
        username: data.facebookUsername
      }
    })
  } else if (type === 'twitter') {
    payloads.push({
      account: {
        service: 'twitter',
        username: data.twitterUsername
      }
    })
  } else if (type === 'linkedin') {
    payloads.push({
      account: {
        service: 'linkedin',
        username: data.linkedinUsername
      }
    })
  } else if (type === 'github') {
    payloads.push({
      account: {
        service: 'github',
        username: data.githubUsername
      }
    })
  } else if (type === 'bitcoin') {
    payloads.push({
      cryptocurrencyAddress: {
        '@type': 'CryptocurrencyAddress',
        currency: 'bitcoin',
        address: data.bitcoinAddress
      }
    })
  } else if (type === 'pgp') {
    payloads.push({
      pgp: {
        fingerprint: data.pgpFingerprint
      }
    })
  } else if (type === 'birthDate') {
    payloads.push({
      birthDate: data.birthDate
    })
  }
  return payloads;
}

module.exports = {
  createProfilePayloads: createProfilePayloads
}