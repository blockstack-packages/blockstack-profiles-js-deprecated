```json
{
    "@context": "http://schema.org/",
    "@type": "Organization",
    "name": "Google",
    "legalName": "Google Inc.",
    "email": "hello@google.org",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mountain View, CA",
        "postalCode": "94043",
        "streetAddress": "1600 Amphitheatre Parkway"
    },
    "employee": [
        {
            "@type": "Person",
            "name": "Larry Page",
            "id": "larrypage.id"
        },
        {
            "@type": "Person",
            "name": "Sergey Brin",
            "id": "sergeybrin.id"
        }
    ],
    "image": [
        {
            "@type": "ImageObject",
            "name": "logo",
            "contentUrl": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }
    ],
    "parentOrganization": {
        "@type": "Organization",
        "name": "Alphabet Inc.",
        "id": "alphabet.id"
    }
}
```