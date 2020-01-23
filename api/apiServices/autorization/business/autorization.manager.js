var dataAccess = require('../../../dataAccess/autorization/autorizationDB');



//Funcion que consulta parametros basicos de la app
exports.getUser = function functionName(req, res) {
  console.log("******************Entra a consultar getUser: "+req.body);
  dataAccess.getUser(req.body, function(resultado){
    if (resultado == null) {
      code = req.body.code;
      if (req.body.code == undefined) code = '-1';
      respuesta = {'code':code,'description':'Código y mensaje de error no defnido'};
    }
    else {
      if (resultado.code == undefined) 
        respuesta = {'code':'200','data':resultado};
      else
        respuesta = {'code':resultado.code,'description':resultado.description};
    }

    responseMessage(respuesta, req, res);

  });
};


//functions use for autorization
/**
 * [Response to the autorization]
 * @param json document return from getUser|
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
