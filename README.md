# Blockchain ID JS

When you regster a blockchain ID on the Bitcoin blockchain, you get a username and a profile.

### Usernames

Let's say you register the username 'alice' within the 'id' namespace, the default namespace for usernames. Then your username would be expressed as `alice.id`.

### Profiles

Profile schema is taken from schema.org. The schema for a person record can be found at http://schema.org/Person. There are some fields that have yet to be included, like the "account", "key", "policy", "id", and "publicKey" fields. An updated schema definition will be published to a different location that superclasses the schema.org Person definition and adds these fields.

#### Example Profile

```json
{
    "name": "Alice Smith",
    "accounts": []
}
```

[Full Profile](/docs/profile.md)

Blockchain ID profiles are stored in two files:

+ a token file that contains signed tokens with profile data
+ a zone file that describes where to find the token file

### Lookups

An identity lookup is performed as follows:

1. lookup the name in blockstore's name records and get back the data hash associated with the name
2. lookup the data hash in the blockstore DHT and get back the zone file
3. scan the zone file for "zone origin" records and get the URL found in the "data" field - the token file URL
4. issue a request to the token file URL and get back the token file
5. parse through the token file for tokens and verify that all the tokens have valid signatures and that they can be tied back to the user's name (by using the public keychain)
6. grab all of the claims in the tokens and merge them into a single JSON object, which is the user's profile

### Zone Files

A zone file contains an origin (the name registered), a TTL (not yet supported), and a list or records.

Each record has a name, class, type, data, and checksums.

If the value of the "name" field is "@", that means the record corresponds to the "zone origin" of the name.

The "class" field corresponds to the namespace of the record's information. In ICANN DNS, this is traditionally "IN" for Internet, but this field could be changed to something else to indicate that the names are registered in a parallel DNS universe.

The "type" field indicates how the record should be resolved. Only "CNAME" is currently supported. This means that the name record should be interpreted as an alias of the URL that is provided in the "data" field.

The "data" field is interpretted in different ways, depending on the value in the "type" field. As mentioned previously, though, the only supported type at the moment is "CNAME", so the "data" field will contain a URL until that changes.

The "checksums" field indicates values in the parsed profile that should be considered "immutable" fields. One can be certain that the values of these fields cannot change because the values of their hashes must correspond to the corresponding values in the checksum records.

The "publicKeychain" field indicates the keychain that was used to sign the tokens found in the token file.

#### Example Zone File

```json
{
    "origin": "alice.id",
    "ttl": "1h",
    "records": [
    ]
}
```

[Full Zone File](/docs/zoneFile.md)

### Token Files

The token file contains a list of token records.

Each record contains the encoded token, a "data" field with the decoded token, a "chainPath" that indicates how to get from the master public keychain to the signing public key, and an "encrypted" field that indicates whether or not the token is encrypted.

To validate each identity token, first decode the token and grab the public key of the issuer. Then, verify the token's signature with the public key. Then check to make sure you can derive the public key from the master public keychain using the chain path. If these checks pass, the token is valid.

#### Example Token File

```json
[
    {
        "token": "",
        "data": "",
        "chainPath": "",
        "encrypted": false
    }
]
```

[Full Token File](/docs/tokenFile.md)
