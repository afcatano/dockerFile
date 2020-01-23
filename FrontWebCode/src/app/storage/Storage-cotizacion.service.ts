import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

//Clase encargada de cargar en localstorage los parametros basicos
@Injectable()
export class StorageCotizacionService {
  private localStorageService;
  private CotizacionSession : any;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.CotizacionSession = this.loadSessionData();
  };
  setCotizacionSession(session: any): void {
    this.CotizacionSession = session;
    this.localStorageService.setItem('BasicCotizacion', JSON.stringify(session));
  };
  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('BasicCotizacion');
    return (sessionStr) ?  JSON.parse(sessionStr) : null;
  };
  getCotizacionSession(): any {
    return this.CotizacionSession;
  };
  removeCotizacionSession(): void {
    this.localStorageService.removeItem('BasicCotizacion');
    this.CotizacionSession = null;
  };
 
}