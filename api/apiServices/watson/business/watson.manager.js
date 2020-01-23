

exports.getVisual = function functionName(req, res) {
  console.log("******************Entra a consultar getVisual: "+req.body);
  var respuesta="";
   respuesta = {'code':'200','data':resultado}
    

    responseMessage(respuesta, req, res);
  
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
