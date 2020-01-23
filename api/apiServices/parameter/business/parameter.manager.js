var dataAccess = require('../../../dataAccess/parameter/parameterDB');



//Funcion que consulta parametros basicos de la app
exports.getParameter = function functionName(req, res) {
  var objService = req.body;
  console.log("******************Entra a consultar getParameter: "+objService);
  dataAccess.getParameter(objService, responseMessage, req, res);
};

exports.getErrorMessage = function functionName(req, res) {
  console.log("******************Entra a consultar getErrorMessage: "+req.body);
  dataAccess.getErrorMessage(req.body.code, function(resultado){
    if (resultado == null) {
      code = req.body.code;
      if (req.body.code == undefined) code = '-1';
      respuesta = {'code':code,'description':'Código y mensaje de error no defnido'};
    }
    else {
      respuesta = {'code':'200','data':resultado}
    }

    responseMessage(respuesta, req, res);
  });
};

exports.getMenuChatBot = function functionName(req, res) {
  console.log("******************Entra a consultar getMenuChatBot: "+req.body);
  dataAccess.getMenuChatBot(function(resultado){

    if (resultado == null) {
      respuesta = {'code':'-1','description':'Opciones de menú no disponibles'};
    }
    else {
      respuesta = {'code':'200','data':resultado}
    }

    responseMessage(respuesta, req, res);
  });
};

//Se encarga de consultar la ultima fecha de actualización del localstorage
exports.memoriaStorageInfo= function functionName(req, res) {
  console.log("******************Entra a consultar getMemoriaStorage");
  dataAccess.memoriaStorageInfo(function(resultado){

    if (resultado == null) {
      respuesta = {'code':'-1','description':'No se optiene la ultima fecha de actualización del localstorage'};
    }
    else {
      respuesta = {'code':'200','data':resultado}
    }

    responseMessage(respuesta, req, res);
  });
};

//Se encarga de reiniciar la fecha de actualización del localstorage del front
exports.memoriaStorage= function functionName(req, res) {
  console.log("******************Entra a consultar MemoriaStorage");
  dataAccess.memoriaStorage(function(resultado){
     respuesta = {'code':'200','data':'MEMORIA REINICIADA'}
     responseMessage(respuesta, req, res);
  });
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
