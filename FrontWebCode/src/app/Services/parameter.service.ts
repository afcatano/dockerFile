import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ParameterInfo} from "../ParameterInfo";
import { AppComponent } from '../app.component';
import { StorageParamsService } from '../storage/storage-params.service';
import { StorageConfigService } from '../storage/storage-config.Service';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private menuChatBotAPI:string;
  private memoriaStorage:string;
 
  constructor(private http:HttpClient,
     private storageUpdate: StorageConfigService
     ,private storageParams: StorageParamsService) {
    this.menuChatBotAPI = "/api/parameter/menuChatBot";
    this.memoriaStorage = "/api/parameter/memoriaStorageInfo";
  }

  menuChatBot(): Observable<any> {
   var parameterInfo = new ParameterInfo();
   return this.http.post( (parameterInfo.isLocal ? parameterInfo.pathApis: "" )+this.menuChatBotAPI, "");
  }

  updateParams(): Observable<any> {
    var parameterInfo = new ParameterInfo();
    return this.http.get( (parameterInfo.isLocal ? parameterInfo.pathApis: "" )+this.memoriaStorage);
   }

   //Optiene la ultima actualizacion para el localstorage
   lastUpdateParams(data,callback){
    //obtiene la ultima fecha de actualizacipon y si se encuentra actualizados los paramateros basicos 
    var storage =this.storageUpdate.getConfigSession();
    this.updateParams().subscribe(
          result => {
                     var date="";
                      if(result.code==200) {
                        //Valida si el objeto esta creado, si no esta creado lo inicializa
                        if(storage){
                          if(!storage.dateUpdate)
                              storage ={};
                          else
                             date =storage.dateUpdate;
                        }else
                           storage ={};

                           
                        storage.dateUpdate= result.data.dateUpdate; //Pone la ultima fecha de actualizacion
                        storage.config = data;//Inserta el obejto memoriaStorageInfo
                        this.storageUpdate.setConfigSession(storage);
                       
                        if(date!=storage.dateUpdate){
                          // location.reload();
                           console.log("Actualiza localstorage de la Actualización general !!");
                        }
                      } else {
                        console.log(JSON.stringify(result, null, 4));
                      }
                      callback();
                    },
                    error => {
                      console.log("Error al actualizar la ultima fecha del localstorage:" +error);
                        console.log(error);
                        callback();
       })
   }



  //Obtiene la lista de parametros para el menu y cada infor de cada chatbot, valida si debe recargar del localstorage o volver a consultar a BD.
  getMenuChatBot(callback){
    var paramsBasic;
    //obtiene la ultima fecha de actualizacipon y si se encuentra actualizados los paramateros basicos 
    var storage =this.storageUpdate.loadSessionData();

    if(storage.dateUpdateParams == undefined)
        storage.dateUpdateParams = "";
        
    if(storage.dateUpdateParams != storage.dateUpdate || !this.storageParams.getParamsSession())
    {
      console.log("Entra a actualizar localstorage de BasicParams.");
        this.menuChatBot().subscribe(
          result => {
                      if(result.code==200) {
                        //Actualiza el registro de actualizaciones realizadas por cada lista
                        storage.dateUpdateParams =storage.dateUpdate;
                        //Actualiza ultima actualizacion de la lista de menu
                        this.storageUpdate.setConfigSession(storage);
                        //Almacena en localstorage la lista de menu
                        this.storageParams.setParamsSession(result);
                        console.log("Actualiza localstorage de BasicParams !!");
                        paramsBasic= result;
                      } else {
                        console.log(JSON.stringify(result, null, 4));
                        paramsBasic = result;
                        //this.parent.openDialog( "",result.description,"Alerta");
                      }
                      return callback(paramsBasic);
                  },
                  error => {
                      console.log(error);
                      paramsBasic = {code:"404",description:"Servidor no disponible"}
                      return callback(paramsBasic);
                     // this.parent.openDialog( "","Servidor no disponible","Alerta");
          })
    }else{
      console.log("Envia localstorage de BasicParams !!");
      //Obtiene parametros de localstorage
      paramsBasic= this.storageParams.getParamsSession();
      return callback(paramsBasic);
    }
    
  }
}
