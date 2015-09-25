'use strict'

var rawPrivateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b22901',
    rawPublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69'

var Tokenizer = require('jwt-js').Tokenizer,
    tokenizer = new Tokenizer('ES256k'),
    createTokens = require('./lib/tokens').createTokens,
    prompt = require('prompt'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    sampleInput = require('./lib/sample-input').ryan

function getPromptPromise() {
  var promptPromise = new Promise(function(resolve, reject) {
    if (typeof sampleInput !== 'undefined') {
      resolve(sampleInput)
    } else {
      prompt.get(properties, function (error, result) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    }
  })
  return promptPromise
}

function getMkdirPromise(outputPath) {
  var mkdirPromise = new Promise(function(resolve, reject) {
    mkdirp(outputPath, function(err) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
  return mkdirPromise
}

function getPrivateKeyPromise() {
  var privateKeyPromise = new Promise(function(resolve, reject) {
    genECDSAPemWithOpenSSL(function(privateKeyPem) {
      resolve(privateKeyPem)
    }, function(error) {
      console.log(error)
      reject(error)
    })
  })
}

function writeTokens(tokens, inputData, outputPath) {  
  var tokenList = []

  tokens.map(function(token) {
    var decodedToken = tokenizer.decode(token)
    var tokenRecord = {
      encodedToken: token,
      decodedToken: decodedToken
    }
    tokenList.push(tokenRecord)
  })

  var outputData = JSON.stringify(tokenList, null, 4)

  fs.writeFile(outputPath, outputData, function(err) {
    if (!err) {
      console.log('user data for +' + inputData.username + ' written to ' + outputPath)
    } else {
      console.log(err)
    }
  })
}

function verifyTokens(tokens, rawPublicKey) {
  tokens.map(function(token) {
    tokenizer.verify(token, rawPublicKey)
  })
}

function main(outputDirectory, outputFilename) {
  prompt.start()

  getPromptPromise().then(function(inputData) {
    var userFolderPath = outputDirectory + '/' + inputData.username,
        fileOutputPath = userFolderPath + '/' + outputFilename

    getMkdirPromise(userFolderPath).then(function() {
      var tokens = createTokens(inputData, rawPrivateKey)
      verifyTokens(tokens, rawPublicKey)
      writeTokens(tokens, inputData, fileOutputPath)
    }, function(err) {
      console.log(err)
    })
  }, function(err) {
    console.log(err)
  })
}

main('users', 'statements.json')
