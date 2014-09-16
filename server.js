var express = require('express');
var app = express();

var redis = require("redis"),
    client = redis.createClient();

client.on('connect', function() {
  console.log('Redis connected');
});

app.listen(3000);