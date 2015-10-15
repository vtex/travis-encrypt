var encrypt = require('./encrypt');
var express = require('express');

var PORT = 3000;
var TOKEN = process.env.GITHUB_TOKEN;
var DATA = process.env.DATA || 'test data';

var app = express();

app.get('/encrypt/public/:org/:repo', function(req, res) {
  encrypt.publicRepo(req.params.org, req.params.repo, DATA, TOKEN, function (err, blob) {
    if (err) {
      res.write(err);
    } else {
      res.write(blob);
    }

    return res.end();
  });
});

app.get('/encrypt/private/:org/:repo', function(req, res) {
  encrypt.privateRepo(req.params.org, req.params.repo, DATA, TOKEN, function (err, blob) {
    if (err) {
      res.write(err);
    } else {
      res.write(blob);
    }

    return res.end();
  });
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+PORT);
});
