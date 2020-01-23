import { Component, OnInit, Input  } from '@angular/core';
import * as XLSX from 'xlsx';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
//Datos con los cuales se va a generar el archivo deben estar en formato JSON
@Input() datos: any[];

  constructor() { }
//Metodo encargado de descargar el archivo XLSX
  descargar( ){
    if(this.datos[0].message){
      const datos =this.quitarHtml()
    }   
    let ws:XLSX.WorkSheet = null;  
    //Se crea una constate la cual definira mi hoja de trabajo y se cargan los datos provenientes del json     
    ws = XLSX.utils.json_to_sheet(this.datos)
    //Se crea una nueva archivo donde se va a guardar la infromacion
    const wb:XLSX.WorkBook =  XLSX.utils.book_new();
    // Sobre el documento que se creo se agrega la informacion necesario y se nombra la hoja de calculo Sheet1
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //Genera el documento y lo descarga con el nombre prueba
    var date = new Date();
    var nameDate= date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getMilliseconds().toString();
    XLSX.writeFile(wb, 'Export'+nameDate+'.xlsx');//TODO - Cambiar el nombre Export por parametro que se enviado para el nombre

  }

  quitarHtml(){
    for (const iterator of this.datos) {
      const mensaje:string = iterator.message +" "
      iterator.message = mensaje.replace(/<[^>]*>/g, '');
    }
  }

  ngOnInit() {
  }

}
