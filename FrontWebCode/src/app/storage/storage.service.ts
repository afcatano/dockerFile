import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {User} from "../Models/User";
import {Session} from "../Models/session";
import {StorageParamsService} from "./storage-params.service";

//Metodo encargado de almacenar al local storage la credenciales del usuario
@Injectable()
export class StorageService {
  private localStorageService;
  private currentSession : Session = null;
  constructor(private router: Router, private storageParams :StorageParamsService
  ) {
    
      this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  };
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  };
  loadSessionData(){
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? JSON.parse(sessionStr) : null;
  };
  getCurrentSession(): Session {
    return this.currentSession;
  };
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.removeItem('SelectedBot');
    this.localStorageService.removeItem('ConfigApp');
    this.localStorageService.removeItem('BasicParams');
    
    this.currentSession = null;
  };
  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  getUserExist(): User {
    var session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };
  logout(): void{
    this.removeCurrentSession();
    this.storageParams.removeParamsSession();
    this.router.navigate(['/login']);
  }
}