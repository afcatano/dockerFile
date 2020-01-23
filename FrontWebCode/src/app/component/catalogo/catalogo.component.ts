import { Component, OnInit } from '@angular/core';
//import { CarritoService } from './../service/carrito.service';
//import { Subscription } from 'rxjs/Subscription';
import { Producto } from '../model/producto';
import { ProductosService } from '../service/productos.service';
import {StorageCarritoService} from '../../storage/Storage-carrito.service';
import{PrincipalComponent} from '../principal/principal.component';
import{ManagerChatbotService} from '../../Services/manager-chatbot.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [ProductosService]
})
export class CatalogoComponent implements OnInit {
  private producto: any;
  //private subscription: Subscription;
  private productos: Array<any> = [];

  constructor(private carritoService: StorageCarritoService, private parent: PrincipalComponent,
    private productosService: ProductosService,
  private service: ManagerChatbotService) { }

  ngOnInit() {
    this.getCatalogo();
  }

  /**
   * getCatalogo: Obtener los productos que NO son novedades
   */
  getCatalogo() {
     this.productosService.getProductos(result =>{
          console.log(result);
          if(result)
          this.productos = result;
          
     })
    }

  /**
   * addProducto
   */
  addProducto(producto) {
    this.carritoService.setCarritoSession(producto);
    this.parent.cargarCarrito();
  }

}
