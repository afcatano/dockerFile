var express = require("express");
var manager = require("./business/traceability.manager");

var api = express.Router();

//Api para el registro de errores
api.post('/api/traceability/registerErrorLog', manager.registerErrorLog);
module.exports = api;