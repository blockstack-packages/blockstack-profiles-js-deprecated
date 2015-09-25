'use strict'

var warningSuffixes = {
  username: ' may only consist of lowercase letters, numbers, dashes and underscores'
}

var properties = [
  {
    name: 'username',
    message: 'Username',
    required: true,
    validator: regexes.username,
    warning: 'Username may only consist of lowercase letters, numbers and underscores'
  },
  {
    name: 'givenName',
    message: 'Given name (first name)'
  },
  {
    name: 'familyName',
    message: 'Family name (last name)'
  },
  {
    name: 'bio',
    message: 'Bio'
  },
  {
    name: 'postalCode',
    message: 'Postal code (ZIP code)',
    validator: regexes.postalCode,
    warning: 'Postal code must be a valid postal code'
  },
  {
    name: 'country',
    message: 'Country'
  },
  {
    name: 'avatarURI',
    message: 'Profile image URL',
    validator: regexes.uri,
    warning: 'Profile image URL must be a valid URL'
  },
  {
    name: 'twitterUsername',
    message: 'Twitter username',
    validator: regexes.username,
    warning: 'Twitter username ' + warningSuffixes.username
  },
  {
    name: 'facebookUsername',
    message: 'Facebook username',
    validator: regexes.username,
    warning: 'Facebook username ' + warningSuffixes.username
  },
  {
    name: 'githubUsername',
    message: 'GitHub username',
    validator: regexes.username,
    warning: 'GitHub username ' + warningSuffixes.username
  },
  {
    name: 'linkedinUsername',
    message: 'LinkedIn username',
    validator: regexes.username,
    warning: 'LinkedIn username ' + warningSuffixes.username
  },
  {
    name: 'bitcoinAddress',
    message: 'Bitcoin address',
    validatore: regexes.bitcoinAddress,
    warning: 'Bitcoin address must be a valid bitcoin address'
  },
  {
    name: 'websiteDomain',
    message: 'Website domain',
    validator: regexes.domain,
    warning: 'Website domain must be a valid fully qualified domain'
  },
  {
    name: 'pgpFingerprint',
    message: 'PGP fingerprint',
    validator: regexes.fingerprint,
    warning: 'PGP fingerprint must be in hex format'
  },
]

module.exports = properties