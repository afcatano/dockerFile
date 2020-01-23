import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

//Clase encargada de cargar en localstorage los parametros basicos
@Injectable()
export class StorageParamsService {
  private localStorageService;
  private ParamsSession : any;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.ParamsSession = this.loadSessionData();
  };
  setParamsSession(session: any): void {
    this.ParamsSession = session;
    this.localStorageService.setItem('BasicParams', JSON.stringify(session));
  };
  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('BasicParams');
    return (sessionStr) ?  JSON.parse(sessionStr) : null;
  };
  getParamsSession(): any {
    return this.ParamsSession;
  };
  removeParamsSession(): void {
    this.localStorageService.removeItem('BasicParams');
    this.ParamsSession = null;
  };
 
}