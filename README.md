# Travis Encrypt

Service that encrypts a Travis public key of a repo with a data that is stored on the server, like an AWS key.

## How to use

Travis requires a Github Access Token with the following scopes:
repo, user:email, write:repo_hook, read:org.

Run the server with an environment variable with your Github token and with the data that you want to encrypt:
```
DATA=test GITHUB_TOKEN=123 npm start
```

### Private repos

**GET**|`/encrypt/private/:org/:repo`
---|---
Example|`/encrypt/private/vtex/storefront`

### Public repos

**GET**|`/encrypt/public/:org/:repo`
---|---
Example|`/encrypt/private/vtex/travis-encrypt`
