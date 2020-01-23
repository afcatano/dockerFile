//import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { StorageParamsService } from '../../storage/storage-params.service';
import { StorageSelectedBotService } from "../../storage/storage.selectedbot";
import { StorageConfigService } from '../../storage/storage-config.Service'
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductosService {
  public serve:string ="http://25.56.189.76:7575";
  private productos: Array<Producto> = [];
  private pathProducts: string;
  constructor(private http: HttpClient,private storage: StorageParamsService, private selectBot: StorageSelectedBotService, private storageUpdate: StorageConfigService) {
    this.pathProducts = "/api/catalogos";

    var fruta=0;
    for (let i = 0; i < 20; i++) { // Creamos un conjunto de 20 productos de prueba
      const producto = new Producto();
      producto.codigo = (i + 1);
      producto.titulo = `Producto ${i}`;
      producto.descripcion = 'Lorem ipsum dolor sit amet...';
      producto.precio = i * 10 + 100;
      producto.fabricante = `Fabricante Tkeno-${i}`;
      producto.imagen ='../../../assets/frutas/Banano.jpg';
        if(fruta==0){
          producto.imagen ='../../../assets/frutas/Banano.jpg';
          producto.titulo = `Banano`;
        }
        if(fruta==1){
          producto.imagen ='../../../assets/frutas/durazno.jpg';
          producto.titulo = `Durazno`;
        }
        if(fruta==2){
          producto.imagen ='../../../assets/frutas/Limon.jpg';
          producto.titulo = `Limon`;
        }
        if(fruta==3){
          producto.imagen ='../../../assets/frutas/Mandarina.jpg';
          producto.titulo = `Mandarina`;
        }
        if(fruta==4){
          producto.imagen ='../../../assets/frutas/Pera.jpg';
          producto.titulo = `Pera`;
        }
        if(fruta==5){
          producto.imagen ='../../../assets/frutas/uvas.jpg';
          producto.titulo = `Uvas`;
          fruta= 0;
        }
      fruta = fruta+ 1;
      producto.novedad = (i < 6); // Marcamos como novedad los 6 primeros
      this.productos.push(producto);
    }
  }

  /**
   * getProductos
   */
  getProductos(callback) {
   callback(this.productos);
    this.products().subscribe(
      result => {
                 var date="";
                  if(result.codigo!=200) {
                  
                  } else {
                    this.productos=[];
                    console.log(JSON.stringify(result, null, 4));
                   // producto: "Limon", imagen: "Limon.jpg", descripcion: ".....", proveedores: Array(0)
                   result.data.forEach(element => {
                    var p = new Producto();
                    //p.codigo 
                    p.titulo= element.producto;
                    p.precio=130;;
                    p.descripcion= element.descripcion;
                    p.imagen= "../../../assets/frutas/"+element.imagen;

                    this.productos.push(p);
                   });
                 
                   
                  // p.fabricante: string;
                }
                callback(this.productos);
                },
                error => {
                  console.log("Error al consultar productos:" +error);
                    console.log(error);
                    
   })


   /* return new Promise((resolve, reject) => {
      if (this.productos.length > 0) {
        resolve(this.productos);
      } else {
        reject('No hay productos disponibles');
      }
    });*/
  }


  products(): Observable<any> {
       
    var menuChatBotAPI = "/api/catalogos";
    var headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    var path="http://datapower.com:9992";//
    path = this.serve;
    return this.http.get(path+ menuChatBotAPI, { headers: headers});
  }

  cotizar(data): Observable<any> {
    var menuChatBotAPI = "/api/CotizacionClientes";
    var headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    var path="http://datapower.com:9992";
    path = this.serve;
    return this.http.post(path+ menuChatBotAPI, data,{ headers: headers});
  }

}
