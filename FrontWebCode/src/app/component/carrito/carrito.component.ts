import { Component, OnInit } from '@angular/core';
import { Subscription}from 'rxjs';
import {StorageCarritoService} from '../../storage/Storage-carrito.service';
import {PrincipalComponent} from '../principal/principal.component';
import {AppComponent} from '../../app.component';
import { ProductosService } from '../service/productos.service';
import {Producto} from '../model/producto'
import {cotizacion} from '../model/cotizacion';

import {StorageCotizacionService} from '../../storage/Storage-cotizacion.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  private carrito: Array<Producto> = [];
  private subscription: Subscription;
  private total: number=0;

  constructor(private carritoService : StorageCarritoService, 
    private cotizaciones: StorageCotizacionService,
    private app:AppComponent,
    private  pincipal: PrincipalComponent) { }

  ngOnInit() {
    //sumatoria de articulos
    this.cargarCarrito();
  }

  removerProducto(producto){
    
    this.carritoService.removeProductCarritoSession(producto);
    this.pincipal.cargarCarrito();
    this.cargarCarrito();
  }

  addProducto(producto) {
    this.carritoService.setCarritoSession(producto);
    this.pincipal.cargarCarrito();
    this.cargarCarrito();
  }

  cargarCarrito(){
    this.total=0;
    this.carrito =this.carritoService.getCarritoSession();
    console.log(this.carrito);
    if( this.carrito){
    this.carrito.forEach(element => {
      this.total=  (element.precio * element.cantidad )+ this.total;
    });
  }else{
    this.carrito =[];
  }
    console.log(this.total);
  }

  checkhout(){
     this.app.openDialog( "","Se ha ralizado la cotización !!","Alerta");
     this.cargarCarrito();
     var coti= new cotizacion();
     coti.producto=[];
     if( this.carrito){
      this.carrito.forEach(element => {
        coti.cliente="Diego Toro";
        coti.producto.push(element.titulo);
      });
      this.cotizaciones.setCotizacionSession(this.carrito);
  }
}
}
