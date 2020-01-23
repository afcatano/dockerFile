import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {StorageParamsService} from "./storage-params.service";

//Metodo encargado de almacenar al local storage configuracion del bot seleccionado en pantalla
@Injectable()
export class StorageSelectedBotService {
  private localStorageService;
  private SelectedBotSession  = null;
  
  constructor(private router: Router) {
    this.localStorageService = localStorage;
     this.loadSessionData();
  };



  setSelectedBotSession(session): void {
    this.SelectedBotSession = session;
    this.localStorageService.setItem('SelectedBot', JSON.stringify(session));
  };
  loadSessionData(){
    var sessionStr = this.localStorageService.getItem('SelectedBot');
    
     if(sessionStr){
       if(sessionStr!="undefined"){
        this.SelectedBotSession =JSON.parse(sessionStr);
        return this.SelectedBotSession;
       }
        else
         return null;
     }
     else{
      return null;
    }
  };
  getSelectedBotSession() {
     if(!this.SelectedBotSession){
      this.loadSessionData();
     }
     return this.SelectedBotSession;
  };
  removeSelectedBotSession(): void {
    this.localStorageService.removeItem('SelectedBot');
    this.SelectedBotSession = null;
  };
  
}