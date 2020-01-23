var dataAccessDB = require("../clientMongoDB");
var _  = require('lodash');

/**VARIABLES**/
var mongoCred = {};
var db;
var DB_COLLECTION_LOGERRORES = "LogErrores";
var mongoClient = require('mongodb').MongoClient;
var dbToConnect = "";


//Public methods join to traceabilityDB
var traceabilityDB = exports;

//------------------------------------------------------------------------------
traceabilityDB.registerErrorLog = function (objMsg, callback, req, res) {
 console.log("traceabilityDB.js - registerErrorLog - Insertar log de errores a la DB : "+ objMsg + ", uri:"+dataAccessDB.getCredentialDB().uri);
  // Connect using MongoClient
  mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
    if (err) throw callback(err);
    // Create a DB connection and create collection for the static messages
    db = database.db(dataAccessDB.getDbToConnect());
    mongoCollection_ErrorLogs = db.collection(DB_COLLECTION_LOGERRORES);
    var fecha = new Date();
    var newDoc = {
      fecha: fecha,
      message: objMsg
    };
    mongoCollection_ErrorLogs.insertOne(newDoc,function (err) {
      if (!err) {
        console.log("traceabilityDB.registerErrorLog  guardada con exito");
      }
      else {
        console.log("traceabilityDB.registerErrorLog Error... No se pudo guardar el log de errores en la base de datos");
      }
     // db.close()
    });
  });
 callback("Exito",req, res);
}

//------------------------------------------------------------------------------
/**
 * @namespace traceabilityDB.js
 * @name errMongo
 * @description Handles all mongo promises error
 * @param {object} err
 */
function errMongo(err) {
  if(err) throw console.error('ClientMongoDB.js - error', err)
}




