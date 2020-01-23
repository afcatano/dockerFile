import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

//Metodo encargado de almacenar al local storage la ultima actualización de información basica de la app
//Es encargado de verificar si se debe recargar los localstorage, funciona como especie de bandera
//por medio de la fecha se determinara si la fecha de actualizacion corresponde a la ultima registrada
@Injectable()
export class StorageConfigService {
  private localStorageService;
  private ConfigSession : any ;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.ConfigSession = this.loadSessionData();
  };
  setConfigSession(session: any): void {
    this.ConfigSession = session;
    this.localStorageService.setItem('ConfigApp', JSON.stringify(session));
  };
  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('ConfigApp');
    return (sessionStr) ? JSON.parse(sessionStr) : null;
  };
  getConfigSession(): any {
    return this.ConfigSession;
  };
  removeConfigSession(): void {
    this.localStorageService.removeItem('ConfigApp');
    this.ConfigSession = null;
  };
  
}