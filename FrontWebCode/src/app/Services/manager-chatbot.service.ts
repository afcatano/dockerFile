import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageParamsService } from '../storage/storage-params.service';
import { StorageSelectedBotService } from "../storage/storage.selectedbot";
import { StorageConfigService } from '../storage/storage-config.Service';
@Injectable({
  providedIn: 'root'
})
export class ManagerChatbotService {

  private pathGetOverview: string;
  private pathGetQualification: string;
  private pathGetRatingDetail: string;
  private pathGetTracing: string;
  private pathGetBehavior: string;
  private pathReports: string;

  constructor(private http: HttpClient, private storage: StorageParamsService, private selectBot: StorageSelectedBotService, private storageUpdate: StorageConfigService) {
    this.pathGetOverview = "/api/statistics/overview";
    this.pathGetQualification = "/api/statistics/raiting"
    this.pathGetRatingDetail = "/api/statistics/raitingdetail";
    this.pathGetTracing = '/api/statistics/tracking';
    this.pathGetBehavior = '/api/statistics/behavior'; 
    this.pathReports = '/api/reports/reports'; 
  }

  getOverview(params): Observable<any> {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathGetOverview, param);
  }

  getReport(params): Observable<any> {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathReports, param);
  }

  getQualification(params): Observable<any> {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathGetQualification, param);
  }

  getDetail(params) {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathGetRatingDetail, param);
  }

  getTracing(params) {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathGetTracing, param);

  }

  getBehavior(params) {
    //Obtiene parametros basicos
    var param = this.storage.getParamsSession();
    var bot = this.selectBot.getSelectedBotSession();
    var config = this.storageUpdate.getConfigSession();
    //Validar si la url a setear es la local o la del ambiente del chatbot
    var path = "";
    var param = params;
    //Verifica que exita la propiedad config
    if (config.config)
      path = config.config.isLocal ? bot.urlLocal : bot.url;

    return this.http.post(path + this.pathGetBehavior, param);

  }


  updateParams(): Observable<any> {
    var menuChatBotAPI = "/api/catalogos";

    var headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/json');
    
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods', 'POST');
    
  
    var path="http://datapower.com:9992";//
    return this.http.get(path+ menuChatBotAPI, { headers: headers});
   }

   //Optiene la ultima actualizacion para el localstorage
   lastUpdateParams(data,callback){
    //obtiene la ultima fecha de actualizacipon y si se encuentra actualizados los paramateros basicos 
    this.updateParams().subscribe(
          result => {
                     var date="";
                      if(result.code==200) {
                        
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

}
