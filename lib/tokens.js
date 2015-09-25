'use strict'

var Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k')

function createProfilePayloads(data, type) {
  var payloads = []
  if (type === 'name') {
     payloads.push({
      name: data.givenName + ' ' + data.familyName,
      givenName: data.givenName,
      familyName: data.familyName
    })
  } else if (type === 'bio') {
    payloads.push({
      description: data.bio
    })
  } else if (type === 'employer') {
    payloads.push({
      worksFor: [{
        '@type': 'Organization',
        url: 'id://' + data.employer + '.id'
      }]
    })
  } else if (type === 'avatar') {
    payloads.push({
      image: [{
        '@type': 'ImageObject',
        name: 'avatar',
        contentUrl: data.avatarURI
      }]
    })
  } else if (type === 'website') {
    data.websiteDomain.split(', ').map(function(domain) {
      payloads.push({
        website: [{
          '@type': 'WebSite',
          url: 'http://' + domain
        }]
      })
    })
  } else if (type === 'facebook') {
    payloads.push({
      account: [{
        '@type': 'Account',
        service: 'facebook',
        username: data.facebookUsername
      }]
    })
  } else if (type === 'twitter') {
    payloads.push({
      account: [{
        '@type': 'Account',
        service: 'twitter',
        username: data.twitterUsername
      }]
    })
  } else if (type === 'linkedin') {
    payloads.push({
      account: [{
        '@type': 'Account',
        service: 'linkedin',
        username: data.linkedinUsername
      }]
    })
  } else if (type === 'github') {
    payloads.push({
      account: [{
        '@type': 'Account',
        service: 'github',
        username: data.githubUsername
      }]
    })
  } else if (type === 'bitcoin') {
    payloads.push({
      payment: [{
        '@type': 'PaymentMethod',
        method: 'cryptocurrency:bitcoin:standard',
        address: data.bitcoinAddress
      }]
    })
  } else if (type === 'birthDate') {
    payloads.push({
      birthDate: data.birthDate
    })
  } else if (type === 'address') {
    payloads.push({
      address: [{
        '@type': 'PostalAddress',
        streetAddress: data.streetAddress,
        addressLocality: data.addressLocality,
        postalCode: data.postalCode,
        addressCountry: data.country
      }]
    })
  } else if (type === 'knows') {
    data.knows.split(', ').map(function(username) {
      payloads.push({
        knows: [{
          '@type': 'Person',
          url: 'id://' + username + '.id'
        }]
      })
    })
  } else {
    // do nothing
  }
  return payloads;
}

var createTokens = function(inputData, rawPrivateKey, rawPublicKey) {
  var tokens = []

  var tokenTypes = ['name', 'bio', 'employer', 'avatar', 'website', 'facebook',
    'twitter', 'linkedin', 'github', 'bitcoin', 'birthDate', 'address',
    'knows'];

  var subject = {
    '@type': 'Person',
    url: 'id://' + inputData.username + '.id'
  }

  var issuer = {
    '@type': 'Person',
    url: 'id://' + inputData.username + '.id',
    publicKey: rawPublicKey
  }

  tokenTypes.map(function(tokenType) {
    var statements = createProfilePayloads(inputData, tokenType)
    statements.map(function(statement) {
      var payload = {
        claim: statement,
        subject: subject,
        issuer: issuer
      }
      var token = tokenizer.sign(payload, rawPrivateKey)
      tokens.push(token)
    });
  });

  return tokens;
}

module.exports = {
  createProfilePayloads: createProfilePayloads,
  createTokens: createTokens
}