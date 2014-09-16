var express = require('express');
var app = express();

var redis = require("redis"),
    client = redis.createClient();

client.on('connect', function() {
  console.log('Redis connected');
});

var shortenerUrl = 'whatever the url is for this site';

app.get('/:link', function(req, res) {
  if (!req.params) {
    res.send('You need specify a link');
  }

  var link = req.params.link;

  client.get(link, function(err, reply) {
    if (err) {
      res.send('There was an error')
    }
    if (!reply) {
      res.send('Could not find that link');
    }

    var url = [shortenerUrl, reply].join('');
    res.redirect(url);
  });

});

app.post('/:link', function(req, res) {
  if (!req.params) {
    res.send('You need specify a link');
  }
  var link = req.params.link;

  client.get(link, function(err, reply) {
    if (err) {
      res.send('There was an error')
    }
    if (!reply) {
      client.set(link, shortenerUrl);
      res.redirect('/')
    }

    var url = [shortenerUrl, reply].join('');
    res.redirect(url);
  });
});


app.listen(3000);