import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../storage/storage.service";

//Servicio que valida la existencia del usuario en localstorage 
//TODO - Implementar una expiracion de session por ejemplo por TOKEN.
@Injectable()
export class ValidateSession implements CanActivate {
  constructor(private router: Router,
              private storageService: StorageService) { }
  canActivate() {
    console.log("verifica session de usuario en storage:"+this.storageService.isAuthenticated());
    if (this.storageService.getUserExist()) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}