var dataAccess = require('../../../dataAccess/traceability/traceabilityDB');


//funcion que registra log de errores
exports.registerErrorLog = function functionName(req, res) {
  var objService = req.body;
  console.log("******************Entra a registrar logs de errores: "+objService);
  dataAccess.registerErrorLog(objService, responseMessage, req, res);
};



//functions use for chatweb
/**
 * [Response to the chat the next message]
 * @param json document return from getNectMessageWeb
 * @param request http
 * @param response http
 */
function responseMessage(document, request, response) {
  console.log("callback",document);
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-type, Origin');
  response.header('Access-Control-Allow-Origin', '*');
  response.status(200).json(document);
};
