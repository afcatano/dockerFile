
import { Component, OnInit } from '@angular/core';
import { Subscription}from 'rxjs';
import {StorageCarritoService} from '../../storage/Storage-carrito.service';
import {AppComponent} from '../../app.component';
import { ProductosService } from '../service/productos.service';
import {Producto} from '../model/producto'
import {cotizacion} from '../model/cotizacion';
import {StorageCotizacionService} from '../../storage/Storage-cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  private carrito: Array<Producto> = [];
  private subscription: Subscription;
  private total: number=0;

  constructor(private carritoService : StorageCarritoService, 
    private cotizaciones: StorageCotizacionService,
    private app:AppComponent) { }

  ngOnInit() {
    this.cotizaciones.loadSessionData();
    this. carrito= this.cotizaciones.getCotizacionSession();
    console.log(this.carrito);
    //sumatoria de articulos
    this.cargarCarrito();
  }

  removerProducto(producto){
    
    this.carritoService.removeProductCarritoSession(producto);
    this.cargarCarrito();
  }

  addProducto(producto) {
    this.carritoService.setCarritoSession(producto);
    this.cargarCarrito();
  }

  cargarCarrito(){
    this.total=0;
    this.carrito =this.cotizaciones.getCotizacionSession();
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
     this.app.openDialog( "","Se ha ralizado la oferta al cliente !!","Alerta");
     this.cargarCarrito();
     var coti= new cotizacion();
     coti.producto=[];
     if( this.carrito){
        this.carrito.forEach(element => {
          coti.cliente="Diego Toro";
          coti.producto.push(element.titulo);
        });
      //this.productosService.cotizar(coti);
      }
      //this.cotizaciones.setCotizacionSession(coti);
}
}
