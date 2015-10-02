# Blockchain ID JS

A Blockchain ID Profile generator and parser that creates the following:

+ a zone file that describes how to load the token file and how to interpret it
+ a token file that contains signed tokens with profile data
+ a profile reconstructed from the token file

### Sample Zone File

```json
{
    "origin": "ryan.id",
    "ttl": "1h",
    "records": [
        {
            "name": "@",
            "class": "IN",
            "type": "CNAME",
            "data": "https://s3.amazonaws.com/mq9/ryan.json",
            "checksums": [
                {
                    "field": "pgp[0].publicKey",
                    "hash": "e508f0c2c455ab79a4fabc4b51aa537e123c08abee40a87c47e6705a2bbae4ae",
                    "algorithm": "SHA256"
                }
            ]
        }
    ]
}
```

### Sample Profile

```json
{
    "name": "Ryan Shea",
    "givenName": "Ryan",
    "familyName": "Shea",
    "description": "Co-founder of Onename",
    "image": [
        {
            "@type": "ImageObject",
            "name": "avatar",
            "contentUrl": "https://s3.amazonaws.com/kd4/ryan"
        },
        {
            "@type": "ImageObject",
            "name": "background",
            "contentUrl": "https://s3.amazonaws.com/dx3/ryan"
        }
    ],
    "website": [
        {
            "@type": "WebSite",
            "url": "shea.io"
        },
        {
            "@type": "WebSite",
            "url": "onename.com"
        }
    ],
    "account": [
        {
            "@type": "Account",
            "service": "facebook",
            "username": "ryaneshea",
            "proofUrl": "https://facebook.com/ryaneshea/posts/10153086767027713"
        },
        {
            "@type": "Account",
            "service": "twitter",
            "username": "ryaneshea",
            "proofUrl": "https://twitter.com/ryaneshea/status/597815798850269184"
        },
        {
            "@type": "Account",
            "service": "github",
            "username": "shea256",
            "proofUrl": "https://gist.github.com/shea256/8920fd8c54674ef9d9af"
        },
        {
            "@type": "Account",
            "service": "instagram",
            "username": "ryaneshea"
        },
        {
            "@type": "Account",
            "service": "venmo",
            "roles": "payment",
            "username": "ryanshea"
        },
        {
            "@type": "Account",
            "service": "bitcoin",
            "role": "payment",
            "address": "14zHpYa8Y1JPVvw1hoC9SqpqHjwu8PC53P",
            "proofMessage": "Verifying that +ryan is my blockchain ID.",
            "proofSignature": "ICuRA+Dq5Dn8AiY9P+mcLzGyibPgG0ec9CphtMk512uPdB5eAncDSHhQZY/7kycvl6PLFEuR+j3OM/K2Vey1+EU="
        },
        {
            "@type": "Account",
            "service": "openbazaar",
            "data": {
                "guid": "34e57db64ce7435ab0f759oca31386527c670bd1"
            }
        }
    ],
    "worksFor": [
        {
            "@type": "Organization",
            "url": "id://onename.id"
        }
    ],
    "knows": [
        {
            "@type": "Person",
            "url": "id://muneeb.id"
        },
        {
            "@type": "Person",
            "url": "id://glepage.id"
        },
        {
            "@type": "Person",
            "url": "id://brianhoffman.id"
        },
        {
            "@type": "Person",
            "url": "id://judecn.id"
        }
    ],
    "key": [
        {
            "@type": "Key",
            "format": "ecdsa-keychain",
            "name": "ecdsa-keychain-0",
            "publicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ"
        },
        {
            "@type": "Key",
            "format": "ecdsa-keychain",
            "name": "ecdsa-keychain-1",
            "publicKeychain": "xpub69W5QnTxuA3VPKvRA4TSSjvAD7CXDmBk9VHrsrEk3XcSCQUdqDAcPHj8UwQd8WagErMaXmkSnjiAMauivRruU66yVdCURwUAt7YBtqt8FEf"
        },
        {
            "@type": "Key",
            "format": "pgp-key",
            "name": "pgp-key-0",
            "publicKey": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v1\n\n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\nET6u\n=hvNf\n-----END PGP PUBLIC KEY BLOCK-----"
        }
    ],
    "policy": [
        {
            "@type": "Policy",
            "role": "authentication",
            "keys": "ecdsa-keychain-0 && ecdsa-keychain-1"
        },
        {
            "@type": "Policy",
            "role": "decryption",
            "keys": "pgp-key-0"
        }
    ],
    "birthDate": "1990-01-01",
    "taxID": "000-00-0000",
    "address": [
        {
            "@type": "PostalAddress",
            "streetAddress": "154 Grand St",
            "addressLocality": "New York, NY",
            "postalCode": "10013",
            "addressCountry": "United States"
        }
    ]
}
```

### Sample Token File

```json
[
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJuYW1lIjoiUnlhbiBTaGVhIiwiZ2l2ZW5OYW1lIjoiUnlhbiIsImZhbWlseU5hbWUiOiJTaGVhIn0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.gOwg4e60A9egBAB4qELaJs2xxQl4wMqUNytyCDIfdLjL7lT-Z5iKvT-oqp7ILxBsYisD7a0C_ply4nF9PYfwQA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "name": "Ryan Shea",
                    "givenName": "Ryan",
                    "familyName": "Shea"
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "gOwg4e60A9egBAB4qELaJs2xxQl4wMqUNytyCDIfdLjL7lT-Z5iKvT-oqp7ILxBsYisD7a0C_ply4nF9PYfwQA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJkZXNjcmlwdGlvbiI6IkNvLWZvdW5kZXIgb2YgT25lbmFtZSJ9LCJzdWJqZWN0Ijp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn0sImlzc3VlciI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9fQ.t6MK0bvJYSc2nQGcntq4kvXWUhmwqS8k3rAQhuOmTKoPmwIs8K2Si3JnAflXekGI0lifpCMVamEftIw_tWCIpw",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "description": "Co-founder of Onename"
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "t6MK0bvJYSc2nQGcntq4kvXWUhmwqS8k3rAQhuOmTKoPmwIs8K2Si3JnAflXekGI0lifpCMVamEftIw_tWCIpw"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJpbWFnZSI6W3siQHR5cGUiOiJJbWFnZU9iamVjdCIsIm5hbWUiOiJhdmF0YXIiLCJjb250ZW50VXJsIjoiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2tkNC9yeWFuIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.TzkJAOGp99x30Xdn2y9grvK9ddl_-v4KA24GfAzCjL7OG1MB8XJklZhaJ8VSzw1dougI75SiEicVcVeMM4k1fw",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "image": [
                        {
                            "@type": "ImageObject",
                            "name": "avatar",
                            "contentUrl": "https://s3.amazonaws.com/kd4/ryan"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "TzkJAOGp99x30Xdn2y9grvK9ddl_-v4KA24GfAzCjL7OG1MB8XJklZhaJ8VSzw1dougI75SiEicVcVeMM4k1fw"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJpbWFnZSI6W3siQHR5cGUiOiJJbWFnZU9iamVjdCIsIm5hbWUiOiJiYWNrZ3JvdW5kIiwiY29udGVudFVybCI6Imh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9keDMvcnlhbiJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.VOobmVM2WvNpxXkP15NAv06qlog0QNTaRBUL78-DzmFBAGTeN-4n2GqKc4qgqUaG9xFVSW9aCn7YpbhxaUT7eg",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "image": [
                        {
                            "@type": "ImageObject",
                            "name": "background",
                            "contentUrl": "https://s3.amazonaws.com/dx3/ryan"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "VOobmVM2WvNpxXkP15NAv06qlog0QNTaRBUL78-DzmFBAGTeN-4n2GqKc4qgqUaG9xFVSW9aCn7YpbhxaUT7eg"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJ3ZWJzaXRlIjpbeyJAdHlwZSI6IldlYlNpdGUiLCJ1cmwiOiJzaGVhLmlvIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.nJYviLbig-T9I7DQZ27da1h-kolwxlg2_olCrgcYhB7eDLH9UixC2jq9Mmqt-job49rHbLmiVg2bOakhUzPaoQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "website": [
                        {
                            "@type": "WebSite",
                            "url": "shea.io"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "nJYviLbig-T9I7DQZ27da1h-kolwxlg2_olCrgcYhB7eDLH9UixC2jq9Mmqt-job49rHbLmiVg2bOakhUzPaoQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJ3ZWJzaXRlIjpbeyJAdHlwZSI6IldlYlNpdGUiLCJ1cmwiOiJvbmVuYW1lLmNvbSJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.JMHT_hbICrFyIFXmtQHsDLcrFLb0lMzVW3ALgGAryAr8BZf8HDaQO2qKqIIAxXjs7VwgsR_xG0dTKmSOFut4gA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "website": [
                        {
                            "@type": "WebSite",
                            "url": "onename.com"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "JMHT_hbICrFyIFXmtQHsDLcrFLb0lMzVW3ALgGAryAr8BZf8HDaQO2qKqIIAxXjs7VwgsR_xG0dTKmSOFut4gA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoiZmFjZWJvb2siLCJ1c2VybmFtZSI6InJ5YW5lc2hlYSIsInByb29mVXJsIjoiaHR0cHM6Ly9mYWNlYm9vay5jb20vcnlhbmVzaGVhL3Bvc3RzLzEwMTUzMDg2NzY3MDI3NzEzIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.FpLYUcqtZA5SHAnIuPUU2S6J_tzKGxD3-q9oOFD9u9M7xkPvKWYv9nV1hWcXFd-wNMFZd8j9z9dBHO2jWHGDXA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "facebook",
                            "username": "ryaneshea",
                            "proofUrl": "https://facebook.com/ryaneshea/posts/10153086767027713"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "FpLYUcqtZA5SHAnIuPUU2S6J_tzKGxD3-q9oOFD9u9M7xkPvKWYv9nV1hWcXFd-wNMFZd8j9z9dBHO2jWHGDXA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoidHdpdHRlciIsInVzZXJuYW1lIjoicnlhbmVzaGVhIiwicHJvb2ZVcmwiOiJodHRwczovL3R3aXR0ZXIuY29tL3J5YW5lc2hlYS9zdGF0dXMvNTk3ODE1Nzk4ODUwMjY5MTg0In1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.agRjA64HtFx7UDfDmPOiWvp0dpY--CLIhBmTB0W2SHTP1SMLmz0tG6bGynAw_J6sG4ulL2EEFApIXTmuW0LlPw",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "twitter",
                            "username": "ryaneshea",
                            "proofUrl": "https://twitter.com/ryaneshea/status/597815798850269184"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "agRjA64HtFx7UDfDmPOiWvp0dpY--CLIhBmTB0W2SHTP1SMLmz0tG6bGynAw_J6sG4ulL2EEFApIXTmuW0LlPw"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoiZ2l0aHViIiwidXNlcm5hbWUiOiJzaGVhMjU2IiwicHJvb2ZVcmwiOiJodHRwczovL2dpc3QuZ2l0aHViLmNvbS9zaGVhMjU2Lzg5MjBmZDhjNTQ2NzRlZjlkOWFmIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.n4o2OoOw9lrE7mjdmrPsu1sLCNtaevII8_jdBpFFeKLw1LSQf9Cok0_uKYndmrq128ZYlWwaQh4nD5NbexJofg",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "github",
                            "username": "shea256",
                            "proofUrl": "https://gist.github.com/shea256/8920fd8c54674ef9d9af"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "n4o2OoOw9lrE7mjdmrPsu1sLCNtaevII8_jdBpFFeKLw1LSQf9Cok0_uKYndmrq128ZYlWwaQh4nD5NbexJofg"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoiaW5zdGFncmFtIiwidXNlcm5hbWUiOiJyeWFuZXNoZWEifV19LCJzdWJqZWN0Ijp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn0sImlzc3VlciI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9fQ.gT5wMdPq39zpPFXOxOzPBodZdh8qMLZ9mq5lRDAiIYokjOM0apq4-tUHPq_ME089MKFxxtSJPeMbnP3eYvCMfA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "instagram",
                            "username": "ryaneshea"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "gT5wMdPq39zpPFXOxOzPBodZdh8qMLZ9mq5lRDAiIYokjOM0apq4-tUHPq_ME089MKFxxtSJPeMbnP3eYvCMfA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoidmVubW8iLCJyb2xlcyI6InBheW1lbnQiLCJ1c2VybmFtZSI6InJ5YW5zaGVhIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.Ld9rGPY1b7pZjHUZUxdLKER4TmHADsw428Sj0NkIZ5vVcmw2AFhb9ENzk4qKDjXTuxbpgusp6hj2OpJntOFjoQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "venmo",
                            "roles": "payment",
                            "username": "ryanshea"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "Ld9rGPY1b7pZjHUZUxdLKER4TmHADsw428Sj0NkIZ5vVcmw2AFhb9ENzk4qKDjXTuxbpgusp6hj2OpJntOFjoQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoiYml0Y29pbiIsInJvbGUiOiJwYXltZW50IiwiYWRkcmVzcyI6IjE0ekhwWWE4WTFKUFZ2dzFob0M5U3FwcUhqd3U4UEM1M1AiLCJwcm9vZk1lc3NhZ2UiOiJWZXJpZnlpbmcgdGhhdCArcnlhbiBpcyBteSBibG9ja2NoYWluIElELiIsInByb29mU2lnbmF0dXJlIjoiSUN1UkErRHE1RG44QWlZOVArbWNMekd5aWJQZ0cwZWM5Q3BodE1rNTEydVBkQjVlQW5jRFNIaFFaWS83a3ljdmw2UExGRXVSK2ozT00vSzJWZXkxK0VVPSJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.auAfQHvGK0Dct1GTdnHTfYQ9ROUKzpAix6Sa4nSR36B5Lwd3tc0u2dsxBLw3n7Gb5t_nW-ipR0gXaBRqJ06giw",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "bitcoin",
                            "role": "payment",
                            "address": "14zHpYa8Y1JPVvw1hoC9SqpqHjwu8PC53P",
                            "proofMessage": "Verifying that +ryan is my blockchain ID.",
                            "proofSignature": "ICuRA+Dq5Dn8AiY9P+mcLzGyibPgG0ec9CphtMk512uPdB5eAncDSHhQZY/7kycvl6PLFEuR+j3OM/K2Vey1+EU="
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "auAfQHvGK0Dct1GTdnHTfYQ9ROUKzpAix6Sa4nSR36B5Lwd3tc0u2dsxBLw3n7Gb5t_nW-ipR0gXaBRqJ06giw"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhY2NvdW50IjpbeyJAdHlwZSI6IkFjY291bnQiLCJzZXJ2aWNlIjoib3BlbmJhemFhciIsImRhdGEiOnsiZ3VpZCI6IjM0ZTU3ZGI2NGNlNzQzNWFiMGY3NTlvY2EzMTM4NjUyN2M2NzBiZDEifX1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.M6h2PlNLCtcr7eQUGdcXgmY7RwVJ4cIeH4IO8IoXXO0Ge3TaWbUEhdIpYZVa5-ZHfVR9qAPNgwsEMHs70coJ0g",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "account": [
                        {
                            "@type": "Account",
                            "service": "openbazaar",
                            "data": {
                                "guid": "34e57db64ce7435ab0f759oca31386527c670bd1"
                            }
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "M6h2PlNLCtcr7eQUGdcXgmY7RwVJ4cIeH4IO8IoXXO0Ge3TaWbUEhdIpYZVa5-ZHfVR9qAPNgwsEMHs70coJ0g"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJ3b3Jrc0ZvciI6W3siQHR5cGUiOiJPcmdhbml6YXRpb24iLCJ1cmwiOiJpZDovL29uZW5hbWUuaWQifV19LCJzdWJqZWN0Ijp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn0sImlzc3VlciI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9fQ.JsKySqNchQw05hrcKs0yCiVZxQp0tE107EW07-YVWpXASrlVpg82b9LEMMSBDCGaN_V6DfD19uHjyaMcfVj78Q",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "worksFor": [
                        {
                            "@type": "Organization",
                            "url": "id://onename.id"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "JsKySqNchQw05hrcKs0yCiVZxQp0tE107EW07-YVWpXASrlVpg82b9LEMMSBDCGaN_V6DfD19uHjyaMcfVj78Q"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrbm93cyI6W3siQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL211bmVlYi5pZCJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.ohYAXWwEmuetoKWo1m4Puv66M049ZlSTGglkKxQdXTXheWIu9fLrF_TgkciHkpshcmcN_HmtyGQkiwLC2G3MSg",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "knows": [
                        {
                            "@type": "Person",
                            "url": "id://muneeb.id"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "ohYAXWwEmuetoKWo1m4Puv66M049ZlSTGglkKxQdXTXheWIu9fLrF_TgkciHkpshcmcN_HmtyGQkiwLC2G3MSg"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrbm93cyI6W3siQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL2dsZXBhZ2UuaWQifV19LCJzdWJqZWN0Ijp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn0sImlzc3VlciI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9fQ.N2qTIxnxKJXbcWQlzY97-EpYwJy_PSzZvkt3-kH44HPsOE8aYnxGk4or9oWR8bppCVsGxgkRYwUy0EYLPQ4X2Q",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "knows": [
                        {
                            "@type": "Person",
                            "url": "id://glepage.id"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "N2qTIxnxKJXbcWQlzY97-EpYwJy_PSzZvkt3-kH44HPsOE8aYnxGk4or9oWR8bppCVsGxgkRYwUy0EYLPQ4X2Q"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrbm93cyI6W3siQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL2JyaWFuaG9mZm1hbi5pZCJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.y-7E0lFjxpiWBUKQtz0ucEH4CqKTSONMLEHKolasAD7OckXch580wBd6T_x43-CdGP0TUVjds8Kn_95e7OqxjQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "knows": [
                        {
                            "@type": "Person",
                            "url": "id://brianhoffman.id"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "y-7E0lFjxpiWBUKQtz0ucEH4CqKTSONMLEHKolasAD7OckXch580wBd6T_x43-CdGP0TUVjds8Kn_95e7OqxjQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrbm93cyI6W3siQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL2p1ZGVjbi5pZCJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.5tFopwdPt176xPoN-J27kLdTQ_U7_8wNA72sv0j-1UsiJS3kuYL3xQVdvaTd7f0jZDDGR7l0ac476JYwFzeM0A",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "knows": [
                        {
                            "@type": "Person",
                            "url": "id://judecn.id"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "5tFopwdPt176xPoN-J27kLdTQ_U7_8wNA72sv0j-1UsiJS3kuYL3xQVdvaTd7f0jZDDGR7l0ac476JYwFzeM0A"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrZXkiOlt7IkB0eXBlIjoiS2V5IiwiZm9ybWF0IjoiZWNkc2Eta2V5Y2hhaW4iLCJuYW1lIjoiZWNkc2Eta2V5Y2hhaW4tMCIsInB1YmxpY0tleWNoYWluIjoieHB1YjY2MU15TXdBcVJiY0ZRVnJRcjRRNGtQamFQNEpqV2FmMzlmQlZLalBkSzZvR0JheUU0NkdBbUt6bzVVRFBRZExTTTlEdWZaaVA4ZWF1eTU2WE51SGljQnlTdlpwN0o1d3N5UVZwaTJheHpaIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.IwcCtUwWcVhUrppdVqNpphsgJzqSLeJ_uiIXLtGvhrhxpHMAYlpaRu89AWRYNIN8qD9fp0rkmNBOA_RVI3CHlA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "key": [
                        {
                            "@type": "Key",
                            "format": "ecdsa-keychain",
                            "name": "ecdsa-keychain-0",
                            "publicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "IwcCtUwWcVhUrppdVqNpphsgJzqSLeJ_uiIXLtGvhrhxpHMAYlpaRu89AWRYNIN8qD9fp0rkmNBOA_RVI3CHlA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrZXkiOlt7IkB0eXBlIjoiS2V5IiwiZm9ybWF0IjoiZWNkc2Eta2V5Y2hhaW4iLCJuYW1lIjoiZWNkc2Eta2V5Y2hhaW4tMSIsInB1YmxpY0tleWNoYWluIjoieHB1YjY5VzVRblR4dUEzVlBLdlJBNFRTU2p2QUQ3Q1hEbUJrOVZIcnNyRWszWGNTQ1FVZHFEQWNQSGo4VXdRZDhXYWdFck1hWG1rU25qaUFNYXVpdlJydVU2NnlWZENVUndVQXQ3WUJ0cXQ4RkVmIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.64yVU3TQEGH1lpU3KHFwdxQ7lW99B_kwCbOTdgOLAouQlrKBKexCiJkZagmueaPJxF5cfEBseXK_1Qs18ELYAw",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "key": [
                        {
                            "@type": "Key",
                            "format": "ecdsa-keychain",
                            "name": "ecdsa-keychain-1",
                            "publicKeychain": "xpub69W5QnTxuA3VPKvRA4TSSjvAD7CXDmBk9VHrsrEk3XcSCQUdqDAcPHj8UwQd8WagErMaXmkSnjiAMauivRruU66yVdCURwUAt7YBtqt8FEf"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "64yVU3TQEGH1lpU3KHFwdxQ7lW99B_kwCbOTdgOLAouQlrKBKexCiJkZagmueaPJxF5cfEBseXK_1Qs18ELYAw"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJwb2xpY3kiOlt7IkB0eXBlIjoiUG9saWN5Iiwicm9sZSI6ImF1dGhlbnRpY2F0aW9uIiwia2V5cyI6ImVjZHNhLWtleWNoYWluLTAgJiYgZWNkc2Eta2V5Y2hhaW4tMSJ9XX0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.gjma63tdSozBSn8bNO3ELvCt3k9yeAdxyPBVfl6Q_RZ_oDtO2yti2vRHgAsxXIfFvQOtZRMAo79MPHvEN5rZvA",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "policy": [
                        {
                            "@type": "Policy",
                            "role": "authentication",
                            "keys": "ecdsa-keychain-0 && ecdsa-keychain-1"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "gjma63tdSozBSn8bNO3ELvCt3k9yeAdxyPBVfl6Q_RZ_oDtO2yti2vRHgAsxXIfFvQOtZRMAo79MPHvEN5rZvA"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJrZXkiOlt7IkB0eXBlIjoiS2V5IiwiZm9ybWF0IjoicGdwLWtleSIsIm5hbWUiOiJwZ3Ata2V5LTAiLCJwdWJsaWNLZXkiOiItLS0tLUJFR0lOIFBHUCBQVUJMSUMgS0VZIEJMT0NLLS0tLS1cblZlcnNpb246IEdudVBHIHYxXG5cbm1RSU5CRlZtTnM0QkVBRHFtMDNYOUlyRGtqOGRBMUZLZ2VpS3ZrYis5ajFuNnNPeEhrcGg5ZW8walpvRXp5eXVcbmVhaTliNkpJY0txdmhYZ2VGWjNvK0pXMzNQNVUzQnJFNExONjhleCtMbU92N2pScU1oaXExZ3FlNFU0T1l2eVJcblpQVVlSa1pEOFk1RzNPSHZ2SUZrd3VyNmNyL294NU1DOStiTHJUYlZ4Y0hlU0tEUTFUN1lYNE1ZTTd1aWlsc3BcbkU2VGFCejNaRUdGUmFQMHZTK0tVUnFxOCtHdks5NVg0ZnNqUkoyTS9HdUtQZm1pTVZoLzNLRnFBN2h6VW9BNUpcblZGdmU2RmRjTUovZXY1MzIxaDJmVDRsWEkveVFsZFBGZGdJQyszeDVNMXRRTE1QZGtyVlpjL3VmV3ZNaGZtT2JcbnFwU0FvTmFhS3F4bDUwNzlpYlpxTHZWMGcwQVgxU2Z5ZDhyN3RUTkV5MHlyZzdQMXpqbE5kS0tEcGlwbGU1czRcbkhlVUZLVXU5OUN2MkU2YmhjV0pCMG11U3VJRVRCZmRRbFZPSSs4TGdQVlhwMU80bUo5dUhGTnFvYnFzb1lIQWRcbndBWnQwOENFZDhVeFllVUN2WFY2VW80UStpOGNEdEhqZ0NNWVBMQjYvUVo0VGEzMUN5V1diUWtIWkUzRzlKcjdcbmo4SUFpMklBUUZObEYxbG9vUk9sWXZFRTNkckN1cVNKdDhyTFpKRFVCT3lTNlgyYllFOVNadmpsTWtSbTJqM0pcbjlTOHBjY3lZRjM4MmFzaHNPTUhobzB0eFp1Q0txYU4zaGNSUFBmMDI5bkJ1VUdqNWhNWFBRWGwrYTJLazF1K2RcbldBT2tvZWRsQ0tNUUNXWUUzOGZ2QVJCSUp0WVJHYllsWE92Si8rYzN3NWx4MWdtQ2xiNklwUlZaSndBUkFRQUJcbnRCaFNlV0Z1SUZOb1pXRWdQSEo1WVc1QWMyaGxZUzVwYno2SkFqNEVFd0VDQUNnRkFsVm1OczRDR3dNRkNRUENcblp3QUdDd2tJQndNQ0JoVUlBZ2tLQ3dRV0FnTUJBaDRCQWhlQUFBb0pFR09QSjJuVlc1ZzNqVG9QLzF2VUk0Y0JcbnAyeWVCZGJpNmVjU0VVTHBMcHhUWlNnRjBTL3JoQ29sWmwvRmZXZXV2MTlub1lvWFc1TWlhOTBiZ04remhsVllcbllaUGdDNzEwZmNKQmdHcXBCQS9rL0EwNGsvWVNZSkFURDlJRmllNkl1OGRMdmtWL2hBcHRDZGtQajZoRlRMTkxcbmc0aGJoVXFHdlo0ZjZFWHhVYlh2bm1LbGRJdytKbW1pZnJjdFNmKy9kTEZVYVljN1A1SE5EbVZLUkk3QlBlQjJcbk85MnhFQ24vcmtpNSt2Vlg4dmFXTDVWV1MyVHdFTEVCVWF4MDNmRUl2VWdPMldKWWh6Tmx5eXNLODBpakhFclJcbnBtR0JEcHZVUnFJamhtOEExMDJJd1NiOUdrMUhTS3dRdFVmUWVOUFR0TXNjMlNBMWNzM2xndHBpVGRaUDB6SGZcblhiRHBnb29OcWhzRGhsRC9wOVpPRmpxQzgyenptdk5lVyt5S0s5SW52bmxHOC9JS05US1JUQzlFV09nNW15R3Vcbk8yVmd6OVBYcE1TY3ZuNjRzTENlbkZkY3lWNGl4Zmkwc2dYcVpydUw2KzljTEU2TFlucmpGMHJuZTl0NWZVSWtcbjRnd2xtTURjV1pYY2hRRUFTV051WTRkTmlEZ0JScHo4c1lkUFBlT1dTWEpSZW9mUHVTNU9PanlhcVlXT2dNK3BcbnhRMU4ydW5hc3lXNlpjcG5rSkZNZG81bkY1Z25DYU8xZUc5dUNWdFQ3d2JXNS8yQnlVUlI2M253Y1FsYkpzZ2FcbnhxdUtWTGJ5UGVTMUxvWWYycFZxeDlEaHRRSGR4N1ZjdXpYSlE4MW5oSmF1MGcvRlNTd290bkVvKzgwN0d3OVNcbnZrNmFBVk4waEdMNldBZk1udU5VSCt0bjluK2tlb1JmSE12RnVRSU5CRlZtTnM0QkVBRERoYm9LZ1JaSisvM0xcblJFb2M3aGNlWnBYU1B6ZTMwLzlSZzlEczdNL1k2ZVViYmJEV0FVeXFncVpwSWRIdDluakQrbld2ZCtNRmgvN2dcbjNGbHQzWENkTnI3ZUlqOXhGMHNLczA4Z01QTkVIU0ZWaGRwMlZZQUs1WVZlc3RzTmFmRlcxWnRsNFhOSlNqR1JcbmtWMFJyaTN4Qkd1RjJ0cGVVSzVaMUF3a0REb2prSW9XbjNTZ25ZcldIOG1QZzF6bTZiSGpPUi9hVWJ5SWY4QVVcbi9PN0FQWFNDd3Q0aTVTWTU3b3lUc2h2dHN3OHV0RkYxdEpoeGFaTUpOY3M3RUlCcnpVOWJTam5pYmhrM0ZSS0hcblIwTG9Ta2tlSXdpYWh3UVVCa1FNejJSZ2VYTWM5MmRLK2VCZ0JzMmp2OTQveE85aVV5anRWNzROT3UwVzZZc2xcbklrbTVKNW4yZ3FZQjJHZlBBZGxtVUowVW04RmtNS0h6M21iQlJic0VmSnBhbTk4WnNacm1tTURkRnRDQmxNWlRcbkZuNWRTQW9RVnMwOFlZOGt4VXhmK2lwZnJFWWxKcStWbjViZm4zVU81UHdjUGIzZmI5ZnZLVmxDZ2E0Z2tFVWxcbjVOMktsamhGdFhDSnBWT0RCK2ZEazhsOHdqNjkxd1VqS2JZcWRwaTg2aU9rY3V6TG5VYjJ4cGpLZmF3ZXRuQWpcbkRUTXBwais3L3pBVUlNTUhibU9OdVpncTVSRlRwZW4zUjZNNlV3Ty9EOTVXUkppWXZaendLVm9ZNy80UnRzUlhcblkvTm1tT2FVRmo4eXJPVzBWdmxuOHYyLzIxajRSWWhKYzJzemY4aXFUYnhLc3lhTllZTjhpd2d0VEk4QkVRQlRcbi9XK1RaUUhnakFKVWZoc0RqamtyUjA2OHhEWTFMd0FSQVFBQmlRSWxCQmdCQWdBUEJRSlZaamJPQWhzTUJRa0RcbndtY0FBQW9KRUdPUEoyblZXNWczS1dRUCt3UXZUS0ZlRS9JWllXQWttNmdUbEpMcERzaFUvcW52UlppUGJralRcbktydVQ3MTVLYTMvY3lxbEEweGk2Q2lWTTRmQ3dwT3FXNWp2SEptaVYyKzluTXQ4K1pFcXhEZlJUNTFSWDVIVUhcbmR4S0krNUtCbGlCaGRPTTd0T0JORERTVjdPaGl5RFNRbTVrekpGODZ2SGVWWFJSSjRkNHVSb2F6VitOUnpNeXhcbmNUTlcrVUJPa3pUdjFJZ054UXdNOC9nTE12bll2MGl1UjNCdzEveU40cFNqRHBnblJFQ0kvWlh1V3dCMTBsVjFcbjByK08wTVVMM0lYZDVVQTZYMWwvRStTTmsybHdnTkNKdHdJQWNRYUNMRk8rZ1ROT1Q2SmZTOW44RzZhNXFubkZcblY0cHVOMWNpZGE3MWMvYWtxNFF5d1E3MlNmK2NQcVRjSFltZkllakYyMWJRbS9vWEZqOUd1K1p0M3p5QVBSZ2Jcbm90Z3VaeFhXdmtwYkVEcXJPUkNIL25OU05SbHNlV1huM2RMZDBRVjNLalRObUlyTm4vVyt1R3IyM2QzMmxLVWdcbi9NVEFoelFSMDFPK2ZCVlA4UUZZUCtodXA0dXdORmI2THhhYjBUMUhpMkpJNU5SbERKU0RjQWhBRkRiMk80SElcbmh6ZVVRdGVjTENQUnN6RG1sNkdQeWhWQUVJbDA4b0x6WWxMMTg1ODlxOUtaWTdYdS93bVpJa1pUTmZyUXcxeVZcbms3K0NhQ2lSdFo1YW1OQkZwQzk5dEx2SjFGUkNHNHZNc040RFU1SzlvU3ZSek51SGhIbC9wdEtaQ2JwZElIVnBcbk9sa3ovYXBkNHRXOU1kWUYzTHdFRGZwYythS2JHTmZTdnIzNUtqVjlORExQa3NQaHlQcDZKN0VPcENEc0NlUytcbkVUNnVcbj1odk5mXG4tLS0tLUVORCBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.QgBf53--sXLNeUWZFSsXHGkGJMLcurWxRUz28sMvl4Pkb7HPS6VvG2C5hkrp--S0sjayUw44bMzmjBS7h400lQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "key": [
                        {
                            "@type": "Key",
                            "format": "pgp-key",
                            "name": "pgp-key-0",
                            "publicKey": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v1\n\n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\nET6u\n=hvNf\n-----END PGP PUBLIC KEY BLOCK-----"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "QgBf53--sXLNeUWZFSsXHGkGJMLcurWxRUz28sMvl4Pkb7HPS6VvG2C5hkrp--S0sjayUw44bMzmjBS7h400lQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJwb2xpY3kiOlt7IkB0eXBlIjoiUG9saWN5Iiwicm9sZSI6ImRlY3J5cHRpb24iLCJrZXlzIjoicGdwLWtleS0wIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.stvsMlbvTbnY28ApyKBWHuVc7o6GYC0ZHZ3W_9lpRQ8bryNRYjJuiijbi3jFrU7IWunDtIwihCrjgYHH3udmBQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "policy": [
                        {
                            "@type": "Policy",
                            "role": "decryption",
                            "keys": "pgp-key-0"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "stvsMlbvTbnY28ApyKBWHuVc7o6GYC0ZHZ3W_9lpRQ8bryNRYjJuiijbi3jFrU7IWunDtIwihCrjgYHH3udmBQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJiaXJ0aERhdGUiOiIxOTkwLTAxLTAxIn0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.kDl6x117kIy8oFNn8fR1EnDrtBGihJXaskbnuR8oJhZifrg-cCBum_KT4y6M0LAfkKGJfojFqSfwW82uXzkiRg",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "birthDate": "1990-01-01"
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "kDl6x117kIy8oFNn8fR1EnDrtBGihJXaskbnuR8oJhZifrg-cCBum_KT4y6M0LAfkKGJfojFqSfwW82uXzkiRg"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJ0YXhJRCI6IjAwMC0wMC0wMDAwIn0sInN1YmplY3QiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifSwiaXNzdWVyIjp7IkB0eXBlIjoiUGVyc29uIiwidXJsIjoiaWQ6Ly9yeWFuLmlkIn19.7zVOvUoq1fwl1OFINPJn-Zx4lkg9kFACP8fK48OBIBH4RV8e20A8mkQI5dZ_KSDqEglhacAub_L2adVtytqgjQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "taxID": "000-00-0000"
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "7zVOvUoq1fwl1OFINPJn-Zx4lkg9kFACP8fK48OBIBH4RV8e20A8mkQI5dZ_KSDqEglhacAub_L2adVtytqgjQ"
        },
        "encrypted": false
    },
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjbGFpbSI6eyJhZGRyZXNzIjpbeyJAdHlwZSI6IlBvc3RhbEFkZHJlc3MiLCJzdHJlZXRBZGRyZXNzIjoiMTU0IEdyYW5kIFN0IiwiYWRkcmVzc0xvY2FsaXR5IjoiTmV3IFlvcmssIE5ZIiwicG9zdGFsQ29kZSI6IjEwMDEzIiwiYWRkcmVzc0NvdW50cnkiOiJVbml0ZWQgU3RhdGVzIn1dfSwic3ViamVjdCI6eyJAdHlwZSI6IlBlcnNvbiIsInVybCI6ImlkOi8vcnlhbi5pZCJ9LCJpc3N1ZXIiOnsiQHR5cGUiOiJQZXJzb24iLCJ1cmwiOiJpZDovL3J5YW4uaWQifX0.V5YlGZUkb0vC0jKsO6EpdCHTLZTI3kwmO0Xxt6fJReKEBNmLWJP3iKnISY728oCI2n00v3PT7Lc3xyKv67MqsQ",
        "data": {
            "header": {
                "typ": "JWT",
                "alg": "ES256"
            },
            "payload": {
                "claim": {
                    "address": [
                        {
                            "@type": "PostalAddress",
                            "streetAddress": "154 Grand St",
                            "addressLocality": "New York, NY",
                            "postalCode": "10013",
                            "addressCountry": "United States"
                        }
                    ]
                },
                "subject": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                },
                "issuer": {
                    "@type": "Person",
                    "url": "id://ryan.id"
                }
            },
            "signature": "V5YlGZUkb0vC0jKsO6EpdCHTLZTI3kwmO0Xxt6fJReKEBNmLWJP3iKnISY728oCI2n00v3PT7Lc3xyKv67MqsQ"
        },
        "encrypted": false
    }
]