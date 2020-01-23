import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../storage/storage.service";

//Servicio que valida la existencia del usuario en localstorage 
//TODO - Implementar una expiracion de session por ejemplo por TOKEN.
@Injectable()
export class RemoveSession implements CanActivate {
  constructor(private router: Router,
              private storageService: StorageService
              
            ) { }
  canActivate() {
    console.log("Se remueve la session activa");
    this.storageService.removeCurrentSession();
    
    return true;
  }
}