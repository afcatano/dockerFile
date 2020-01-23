var traceabilityServices = require("./apiServices/traceability/traceability.services");
var parameterServices = require("./apiServices/parameter/parameter.services");
var autorizationServices = require("./apiServices/autorization/autorization.services");							   
var watsonServices = require("./apiServices/watson/watson.services");							   


//Se agregan todas las apis al modulo export
module.exports = function(server) {
  server.use(traceabilityServices);
  server.use(parameterServices);
  server.use(autorizationServices);
  server.use(watsonServices);
};