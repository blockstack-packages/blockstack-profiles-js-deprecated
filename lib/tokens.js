'use strict'

var Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k'),
    createProfilePayloads = require('./payloads').createProfilePayloads

var createTokens = function(inputData, rawPrivateKey) {
  var tokens = [], payloads, token

  var tokenTypes = ['name', 'address', 'bio', 'avatar', 'website', 'facebook',
    'twitter', 'linkedin', 'github', 'bitcoin', 'pgp', 'birthDate'];

  tokenTypes.map(function(tokenType) {
    payloads = createProfilePayloads(inputData, tokenType)
    payloads.map(function(payload) {
      payload = {claim: payload}
      token = tokenizer.sign(payload, rawPrivateKey)
      tokens.push(token)
    });
  });

  return tokens;
}

module.exports = {
  createTokens: createTokens
}