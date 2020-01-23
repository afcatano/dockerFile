import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../storage/storage.service";

//Servicio que valida la existencia del usuario en localstorage 
//TODO - Implementar una expiracion de session por ejemplo por TOKEN.
@Injectable()
export class UserLocalSession implements CanActivate {
  constructor(private router: Router,
              private storageService: StorageService) { }
  canActivate() {
    
    console.log("Encuentra session activa");
    if (this.storageService.loadSessionData()) {
      // logged in so return true
      this.router.navigate(['/home']);
      return false;
    }
    // not logged in so redirect to login page
    return true;
  }
}