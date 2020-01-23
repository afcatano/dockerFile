import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

//Clase encargada de cargar en localstorage los parametros basicos
@Injectable()
export class StorageCarritoService {
  private localStorageService;
  private CarritoSession : any;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.CarritoSession = this.loadSessionData();
  };
  //Guardar en carrito
  setCarritoSession(producto): void {
    var listCarrito = this.localStorageService.getItem('BasicCarrito');
    var carrito=[];
    if(listCarrito){
      var isExist=false;
      carrito= JSON.parse(listCarrito);

      for(let index = 0; index < carrito.length; index++) {
        const element = carrito[index];
        if(element.titulo== producto.titulo)
          {
            element.cantidad=element.cantidad+1;
            isExist=true
          }
      }
      

    if(!isExist)
     { 
       producto.cantidad=1;
       carrito.push(producto);
     }

    }else{
      producto.cantidad=1;
      carrito.push(producto);
    }
    this.CarritoSession =carrito;
    this.localStorageService.setItem('BasicCarrito', JSON.stringify(carrito));
  };
  removeProductCarritoSession(producto: any): void {
    var listCarrito = this.localStorageService.getItem('BasicCarrito');
    var carrito=[];
    if(listCarrito){
      var isExist=false;
      
      carrito= JSON.parse(listCarrito);


      for(let index = 0; index < carrito.length; index++) {
        const element = carrito[index];
        if(element.titulo== producto.titulo)
          {
            element.cantidad=element.cantidad-1;
            isExist=true;
            if(element.cantidad==0)
            carrito.splice( index, 1 );
          }
      }
      

      if(!isExist)
      carrito.push(producto);
      
    }else{
      //carrito.push(producto);
    }
    this.CarritoSession =carrito;
    this.localStorageService.setItem('BasicCarrito', JSON.stringify(carrito));
  };

  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('BasicCarrito');
    return (sessionStr) ?  JSON.parse(sessionStr) : null;
  };
  getCarritoSession(): any {
    return this.CarritoSession;
  };
  removeCarritoSession(): void {
    this.localStorageService.removeItem('BasicCarrito');
    this.CarritoSession = null;
  };
 
}