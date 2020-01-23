//Custom modules
var routes = require("./api/routes")
  , clienteMongoDB = require("./api/dataAccess/clientMongoDB");

// Import compression 
var compression = require('compression');
//Import fs to read the certificates
var fs = require('fs');

//require https to create your secure server
var https = require('https');

//require http to redirect the secure
var http = require('http');

//require ddos to restrict the amount of petitions from a single client
var Ddos = require('ddos');

//require helmet to desactivate some default headers used by express that represent a potential threat
var helmet = require('helmet');

//require async to handle calbacks
var async = require('async'); 
//Global Variables
global.serverPath = __dirname;

//Node js Modules
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , cors = require('cors');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv(),
  port = cfenv.port || process.env.PORT || 7020;
  securePort = cfenv.securePort || process.env.securePort || 7022; 
/**
  Set up helmet to protect various kinds of attacks
  Documentation at ... https://helmetjs.github.io/
**/
app.use(helmet({
  //This header might cause trouble when rendering the bot from another source, if the integration fails, please try removing this header
      xssFilter: true,
      noSniff : true,
      hsts : true,
      frameguard : false
      /* {
          action: 'allow-from',
          domain: 'http://test.oficinavirtual.com,http://test.oficinamobile.com,https://ambientepruebas.segurosbolivar.com'
      }*/
  }));
// create a new express server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors());
/**
  Esta librería controla el origen desde donde se reciben las peticiones, si al realizar la integración ton PureCloud las peticiones no es estan tratando de forma correcta, recomiendo remover la siguiente linea ya que puede poner problema con estas peticiones
**/
const ALLOWED_METHODS = ['GET', 'PUT', 'POST'];

//const whitelist = ['https://ambientepruebas.segurosbolivar.com','https://www.segurosbolivar.com'];
const whitelist = [''];

app.use(cors({
  "methods": ALLOWED_METHODS.join(",")
  //, "origin":whitelist.join(",")
}));
//Set it up to a 50 requests limit and create a message to be shown when the limit is reached
var ddos = new Ddos({
  limit: 800,
  errormessage: "Por seguridad, se te ha bloqueado el acceso temporalmente, gracias."
});
//app.use(ddos.express); //TODO-Debido a cambio de version la implemntacion de DDOS esta fallando. se debe revizar mas adelante 

//Se aplica compresion
app.use(compression());
//Disable express header x-powered-by
app.disable('x-powered-by');
//Tell express to allow accept redirected requests
app.enable('trust proxy');
app.use(function(req, res, next){
 // console.log(req.get('host'));
    if(req.secure) return next();
    else {
        if(appEnv.isLocal)
            res.redirect("https://localhost" + ":" + securePort + req.url);
        else
            res.redirect("https://" + req.headers.host + req.url);
    }
}); 
//Expresss no formate
app.locals.pretty = true;
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
//app.use("/api",express.static(__dirname + "/publicAdviser"));
//Define routes for the Backend
routes(app);

//Init Mongo DataBase
clienteMongoDB.init(appEnv.isLocal,
  function (err) {
    if(err){
      console.log('warn', "Error Init mongo db", err);
      process.exit(1);
    }
    console.log("Saliendo clienteMongoDB.js - init");
  }
);


// start server on the specified port and binding host
/*app.listen(port, function() {
  console.log('Listening on port ' + port)
});*/
async.series([
  function(cb2) {
    if(appEnv.isLocal) {
        var options = {
            key: fs.readFileSync(global.serverPath + '/ssl/localhost/localhost.key'),
            cert: fs.readFileSync(global.serverPath + '/ssl/localhost/localhost.crt'),
        };
        serverSecure = https.createServer(options, app);
        server = http.createServer(app);
        cb2();
    } else {
        server = http.createServer(app);
        cb2();
    }
  }, function(cb2) {
          server.listen(port, cb2);
  }
  , function(cb2) {
    if(appEnv.isLocal) {
        console.log("Engine starting on port " + securePort + " ...");
        serverSecure.listen(securePort, cb2);
    } else {
      cb2();
    }
}
], function (err) {
  if (err) {
      if (callback)
          console.log('Engine failed to start');;
      throw err;
  }
  console.log("Engine started");
});
