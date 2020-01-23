var express = require("express");
var manager = require("./business/autorization.manager");

var api = express.Router();

api.post('/api/autorization/autorization', manager.getUser);
module.exports = api;