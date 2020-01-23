import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ParameterService } from '../../Services/parameter.service';
import { AppComponent } from '../../app.component';
import {StorageSelectedBotService} from "../../storage/storage.selectedbot";
import { ParameterInfo } from '../../ParameterInfo';
import { StorageService } from '../../storage/storage.service'
import { element } from 'protractor';
import { Router } from '@angular/router';
import {StorageCarritoService} from '../../storage/Storage-carrito.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //Variables del menu material
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  //Variables
  navMenuHome = {"state":"/","title":"Home","icon":"dashboard"}
  navMenuUsuario = []
  navMenuCerrarSesion = {"state":"/login","title":"Cerrar Sesión","icon":"exit_to_app"} 
  navMenuLogin = {"state":"/login","title":"Iniciar Sessión","icon":"lock"} 
  navMenuProductos = {"state":"/products","title":"Ver Productos","icon":"store"} 
  navMenu = [this.navMenuHome,this.navMenuCerrarSesion];//Variable que contiene la lista de menú
  navMenuChatBot = [];
  botSelected:any;
  tituloBot:string;
  saludo:string;
  verCarrito=false;
  listCarrito :any;
  totalCarrito=0;
  cantidadProductos=0;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private servicio:ParameterService, private parent: AppComponent,private selectBot : StorageSelectedBotService, 
    private sesion:StorageService, public router: Router,
  private carrito: StorageCarritoService ) {

    //this.botSelected=  this.selectBot.getSelectedBotSession();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.cargarCarrito();
      //Obtiene la ultima actualización en el localstorage
      var paramInfo = new ParameterInfo();
    /*  this.servicio.lastUpdateParams(paramInfo,result =>{
         this.getMenuChatBot();
     });*/
    
  }

  cargarCarrito(){
    //Capturar Carrito
    this.listCarrito= this.carrito.getCarritoSession();
    if(this.listCarrito){
      this.cantidadProductos=0;
      this.totalCarrito=0;
      this.verCarrito = true;
      this.listCarrito.forEach(element => {
        this.totalCarrito=  (element.precio * element.cantidad )+ this.totalCarrito;
        this.cantidadProductos=this.cantidadProductos+ (1 * element.cantidad );
      });
     }else{
      this.listCarrito=[];
     }
  }
    //Invoca servicio de consulta  del menu de cada chatbot
  getMenuChatBot(){
    //Invoca servicio de consulta del menu de cada chatbot
   this.servicio.getMenuChatBot(result =>{
     if(result.code==200) {
      result.data.forEach(element => {
        var menuItem= {"state":element.link,"title":element.titulo,"icon":element.icono};
        this.navMenuChatBot.push(menuItem);
      });

    this.navMenuUsuario = result.data;  
    }else{
      this.parent.openDialog( "","Servidor no disponible","Alerta");
    }
  });
}

  //funcion que actualiza el menu con las opciones que tiene habilidada cada chatbot
  onMenuChatBotClick(chatBotSelected) {
    this.navMenu = []
    this.navMenu.push(this.navMenuHome);
    this.navMenuUsuario.forEach(chatBotMenuItem => {
      if (chatBotMenuItem.titulo == chatBotSelected[0].title) {
        this.botSelected=chatBotMenuItem; //Carga el bot seleccionado
        this.tituloBot = this.botSelected.titulo;
        this.selectBot.setSelectedBotSession(this.botSelected);
        chatBotMenuItem.ChatBot.forEach(element => {
          var menuItem= {"state":element.link,"title":element.titulo,"icon":element.icono};
          this.navMenu.push(menuItem);
        })
      }
    })

    
    this.navMenu.push(this.navMenuLogin);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if( this.sesion.loadSessionData() ){
      this.saludo = `Bienvenido ${this.sesion.loadSessionData().user.user}`
    }
    this.navMenu = []
    this.navMenu.push(this.navMenuHome)
    let bot = this.selectBot.getSelectedBotSession()
    if(bot)
      if(bot!=null){
        this.tituloBot = bot.titulo
        console.log(bot)
        bot.ChatBot.forEach(element =>{
          let menuItem = {"state":element.link,"title":element.titulo,"icon":element.icono};
          this.navMenu.push(menuItem)
        })
        this.navMenu.push(this.navMenuCerrarSesion)
      }
      this.navMenu.push( this.navMenuProductos);
      this.navMenu.push(this.navMenuLogin)
  }
 
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}

