
var _  = require('lodash');

/**VARIABLES**/
var mongoCred = {};
var db;
var collectionMessage;
var dbLocal = false;
var DB_COLLECTION_MESSAGES;
var mongoClient = require('mongodb').MongoClient;
var dbToConnect = 'SB_CHATBOT_ADMIN';

//Public methods join to clienteMongoDB
var clienteMongoDB = exports;

//------------------------------------------------------------------------------
//Inicia variables para acceso a BD
clienteMongoDB.init = function(isLocal, callback) {
  console.log("Entrando clienteMongoDB.js - init");
  if(isLocal){
    dbLocal = true;
    // App running on localhost
    mongoCred.uri = 'mongodb://localhost:27017';
  } else {
    // App running on Bluemix
    setMongoDBCredentials();
  }
  console.log("clienteMongoDB.js - init url: " + mongoCred.uri);

  //Si hay ejecuciones para cargar en memoria se llaman aquí
 
  callback();

};

//------------------------------------------------------------------------------
function DBConnection() {
   var dbConnection = new Promise(
     function (resolve, reject) {
       mongoClient.connect(mongoCred.uri)
         .then (function (database) {
           resolve(database.db(dbToConnect));
         })
         .catch(function (err) {
           reject(err);
         })
     }
   );
   return dbConnection
};

//-----------------------------------------------------------------------------
clienteMongoDB.getCredentialDB = function() {
    return mongoCred;
}

//-----------------------------------------------------------------------------
clienteMongoDB.getDbToConnect = function() {
  return dbToConnect;
}


//-------------------------------------------------------------------------------
function setMongoDBCredentials() {

  //Parse the process.env for the port and host that we've been assigned
  if (process.env.VCAP_SERVICES) {
    // Running on Bluemix. Parse the port and host that we've been assigned.
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    // Also parse Mon settings.
    mongoCred = vcapServices['compose-for-mongodb'][0]['credentials'];
    //compose-for-mongodb
  }else{
    console.log('warn', "MongoDB Fail credentials");
  }
};

//------------------------------------------------------------------------------
/**
 * @namespace clienteMongoDB.js
 * @name errMongo
 * @description Handles all mongo promises error
 * @param {object} err
 */
function errMongo(err) {
  if(err) throw console.error('ClientMongoDB.js - error', err)
}





