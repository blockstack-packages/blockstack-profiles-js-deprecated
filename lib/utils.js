'use strict'

var Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k')

var beautifyToken = function(token) {
  var decodedToken = tokenizer.decode(token);
  var prettyToken = JSON.stringify(decodedToken, null, 4);
  return prettyToken;
}

var usernameToBlockchainIdUri = function(username) {
  return "id://" + username + ".id";
}

module.exports = {
    beautifyToken: beautifyToken,
    usernameToBlockchainIdUri: usernameToBlockchainIdUri
}