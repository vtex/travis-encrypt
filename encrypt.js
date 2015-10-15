var NodeRSA = require('node-rsa');
var axios = require('axios');

var encryptData = function (data, key, callback) {
  var pem = key.replace(/RSA PUBLIC KEY/g, 'PUBLIC KEY');
  try {
    var publicKey = new NodeRSA(pem, 'pkcs8-public-pem');
    var cipherText = publicKey.encrypt(data, 'base64');
    return callback(null, cipherText);
  } catch (err) {
    return callback(err);
  }
};

var authGithub = function(pro, token) {
  var domain = 'org';
  if (pro) { domain = 'com'; }

  return axios({
    method: 'post',
    url: 'https://api.travis-ci.' + domain + '/auth/github',
    headers: {
      'User-Agent': 'vtex-travis-encrypt/1.0.0',
      Accept: 'application/vnd.travis-ci.2+json'
    },
    data: {
      github_token: token
    }
  });
}

var getRepoKey = function(pro, ownerName, name, access_token) {
  var domain = 'org';
  if (pro) { domain = 'com'; }

  return axios({
    url: 'https://api.travis-ci.' + domain + '/repos/' + ownerName + '/' + name + '/key',
    headers: {
      'User-Agent': 'vtex-travis-encrypt/1.0.0',
      Accept: 'application/vnd.travis-ci.2+json',
      Authorization: 'token ' + access_token,
    }
  });
}

var showErrors = function(res, callback) {
  res.config.headers.Authorization = 'VTEX: esse campo eh privado';
  callback(JSON.stringify(res));
}

var encryptPublicRepo = function(ownerName, name, data, token, callback) {
  authGithub(false, token)
    .then(function(res) {
      return getRepoKey(false, ownerName, name, res.data.access_token);
    })
    .catch(function(res) { showErrors(res, callback); })
    .then(function(res) {
      encryptData(data, res.data.key, callback);
    })
    .catch(function(res) { showErrors(res, callback); });
}

var encryptPrivateRepo = function(ownerName, name, data, token, callback) {
  authGithub(true, token)
    .then(function(res) {
      return getRepoKey(true, ownerName, name, res.data.access_token);
    })
    .catch(function(res) { showErrors(res, callback); })
    .then(function(res) {
      encryptData(data, res.data.key, callback);
    })
    .catch(function(res) { showErrors(res, callback); });
}

module.exports = {
  privateRepo: encryptPrivateRepo,
  publicRepo: encryptPublicRepo
};
