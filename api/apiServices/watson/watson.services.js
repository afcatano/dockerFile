var express = require("express");
var manager = require("./business/watson.manager");

var api = express.Router();

api.post('/api/watson/visual', manager.getVisual);

module.exports = api;