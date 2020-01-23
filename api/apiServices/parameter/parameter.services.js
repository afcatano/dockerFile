var express = require("express");
var manager = require("./business/parameter.manager");

var api = express.Router();

api.post('/api/parameter/parameter', manager.getParameter);
api.post('/api/parameter/errorMessage', manager.getErrorMessage);
api.post('/api/parameter/menuChatBot', manager.getMenuChatBot);
api.get('/api/parameter/memoriaStorageInfo', manager.memoriaStorageInfo);
api.get('/api/parameter/memoriaStorage', manager.memoriaStorage);

module.exports = api;