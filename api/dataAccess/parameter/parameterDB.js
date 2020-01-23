var dataAccessDB = require("../clientMongoDB");
var _  = require('lodash');

/**VARIABLES**/
var mongoCred = {};
var db;
var DB_COLLECTION_PARAMETROS = "Parametro";
var DB_COLLECTION_CATALOGO_ERRORES = "CatalogoErrores";
var DB_COLLECTION_MENU_CHATBOT = "MenuChatBot";
var mongoClient = require('mongodb').MongoClient;
var dbToConnect = "";


//Public methods join to parameterDB
var parameterDB = exports;

//------------------------------------------------------------------------------
/**
 * @namespace parameterDB.js
 * @name errMongo
 * @description Handles all mongo promises error
 * @param {object} err
 */
function errMongo(err) {
  if(err) throw console.error('ClientMongoDB.js - error', err)
}

//------------------------------------------------------------------------------
parameterDB.getParameter = function (objMsg, callback, req, res) {
 console.log("parameterDB.js - getParameter - consultar en la DB parametros uri:"+dataAccessDB.getCredentialDB().uri);
  // Connect using MongoClient
  mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
    var msgData=[];
    if (err) throw callback(err);
    // Create a DB connection and create collection for the static messages
    db = database.db(dataAccessDB.getDbToConnect());
    collectionData = db.collection(DB_COLLECTION_PARAMETROS);
    findMsgChat = { $match: {'nombre':'ParametrosBase'} }

    collectionData.aggregate(findMsgChat).toArray(function(err, re){
        if(err)
          console.log("Error al consultar Parametros", err);
        if(re)
        {
          re.forEach(function(messageDatos){
            msgData.push(messageDatos);
          })
          callback(msgData,req, res);
        }
     });
   
  });

}

parameterDB.getErrorMessage = function (code, callback) {
  console.log("parameterDB.js - getErrorMessage - consultar en la DB CatalogoErrores uri:"+dataAccessDB.getCredentialDB().uri);
   // Realizar la conexion usando cliente Mongo
   mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
     if (err) throw callback(err);
     // Crear conexion BD y definir la coleccion da datos
     db = database.db(dataAccessDB.getDbToConnect());
     collectionData = db.collection(DB_COLLECTION_CATALOGO_ERRORES);

     patronBuscado = {'code':code}

     collectionData.findOne(patronBuscado, (err, item) => {
       if(err)
           console.log("Error al consultar CatalogoErrores", err);
       callback(item);
        });
   });
 
 }


 //Se encarga de traer la ultima fecha de actulizacion para el localstorage
 parameterDB.memoriaStorageInfo = function (callback) {
  console.log("parameterDB.js - memoriaStorageInfo - consultar en la DB la ultima fecha de actualización :"+dataAccessDB.getCredentialDB().uri);
   // Realizar la conexion usando cliente Mongo
   mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
    if (err) throw callback(err);
     // Crear conexion BD y definir la coleccion da datos
     db = database.db(dataAccessDB.getDbToConnect());
     collectionData = db.collection(DB_COLLECTION_PARAMETROS);

     patronBuscado = {'llave':'FechaActualizacion'}

     collectionData.find(patronBuscado).toArray(function(err, datos) {
      if(err)
        console.log("Error al consultar la ultima fecha de actualización", err);

      console.log(datos);
      var object ={"dateUpdate":datos[0].valor}
      callback(object);
      });
   });
  }


  //Se encarga de reiniciar la fecha de catualizacion para el localstorage
  parameterDB.memoriaStorage = function (callback) {
    console.log("parameterDB.js - memoriaStorageInfo - consultar en la DB la ultima fecha de actualización :"+dataAccessDB.getCredentialDB().uri);
     // Realizar la conexion usando cliente Mongo
     mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
      if (err) throw callback(err);
       // Crear conexion BD y definir la coleccion da datos
       db = database.db(dataAccessDB.getDbToConnect());
       collectionData = db.collection(DB_COLLECTION_PARAMETROS);
  
       patronBuscado = {'llave':'FechaActualizacion'}
       collectionData.update(patronBuscado, {$set: {"valor": new Date()}})
       callback();
        
     });
    }

   parameterDB.getMenuChatBot = function (callback) {
    console.log("parameterDB.js - getMenuChatBot - consultar en la DB MenuChatBot uri:"+dataAccessDB.getCredentialDB().uri);
     // Realizar la conexion usando cliente Mongo
     mongoClient.connect(dataAccessDB.getCredentialDB().uri, function(err, database) {
      if (err) throw callback(err);
       // Crear conexion BD y definir la coleccion da datos
       db = database.db(dataAccessDB.getDbToConnect());
       collectionData = db.collection(DB_COLLECTION_MENU_CHATBOT);
  
       patronBuscado = {}
  
       collectionData.find(patronBuscado).toArray(function(err, datos) {
        if(err)
          console.log("Error al consultar Menu", err);
  
        callback(datos);
        });
     });
 
 }

