# Travis Encrypt

Service that encrypts a Travis the public key of a repo with a data that is stored on the server, like an AWS key.

## How to use

### Private repos

**GET**|`/encrypt/private/:org/:repo`
---|---
Example|`/encrypt/private/vtex/storefront`

### Public repos

**GET**|`/encrypt/public/:org/:repo`
---|---
Example|`/encrypt/private/vtex/travis-encrypt`
