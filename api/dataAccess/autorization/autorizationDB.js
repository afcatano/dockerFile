var parameterDB = require('../parameter/parameterDB');
var dataAccessDB = require("../clientMongoDB");
var _  = require('lodash');

/**VARIABLES**/
var mongoCred = {};
var db;
var DB_COLLECTION_USUARIO = "Usuario";
var mongoClient = require('mongodb').MongoClient;
var dbToConnect = "";

//Public methods join to parameterDB
var autorizationDB = exports;

//------------------------------------------------------------------------------
autorizationDB.getUser = function (objMsg, callback) {
    console.log("autorizationDB.js - getUser - consultar en la DB usuarios uri:"+dataAccessDB.getCredentialDB().uri);
     // Realizar la conexion usando cliente Mongo
     mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
       var msgData;
       if (err) throw callback(err);
       // Crear conexion BD y definir la coleccion da datos
       db = database.db(dataAccessDB.getDbToConnect());
       collectionData = db.collection(DB_COLLECTION_USUARIO);

       patronBuscado = {'usuario':objMsg.user,'password':objMsg.password}

       collectionData.findOne(patronBuscado,(err, item) => {
          if(err)
             console.log("Error al consultar usuarios", err);
            if (item == null) {
               parameterDB.getErrorMessage('100', function(response){
                 callback(response);
                  })
            }
            else
              callback(item);
          }
        )}
     )}
    
   
   //------------------------------------------------------------------------------
   /**
    * @namespace autorizationDB.js
    * @name errMongo
    * @description Handles all mongo promises error
    * @param {object} err
    */
   function errMongo(err) {
     if(err) throw console.error('ClientMongoDB.js - error', err)
   }
   
