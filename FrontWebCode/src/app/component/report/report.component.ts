import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ManagerChatbotService } from '../../Services/manager-chatbot.service';
import { InfoDateFilter } from '../../Models/InfoDateFilter';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  //Variable Spinner
  rangoFechas: InfoDateFilter
  local: any

  spinner = false;


  infoTable: any[] = [];
  dataTitle = {
    "Titulo": 'titulo',
    "Descripcion": 'descripcion',
    "Valor": 'valor'
  }

  arrayExcel: any[] = []
  arrayImprimir: any[];

  constructor(private api: ManagerChatbotService) { }

  ngOnInit() {
    this.local = JSON.parse(localStorage.getItem(`SelectedBot`)).ChatBot[4].resportes
    setTimeout(()=> {
      this.spinner = false;
    }, 5000);
    this.spinner = true;
    //this.obtenerReportes()
  }

  getRangeDate(rangeDate: InfoDateFilter) {
    this.rangoFechas = rangeDate
    this.obtenerReportes()
  }

  obtenerReportes() {
    var infoTable2: any[] = []
    this.local.forEach(element => {

      var body = {
        nombreReporte: element.nombre,
        initialDate: this.rangoFechas.initialDate,
        endDate: this.rangoFechas.endDate
      }

      var valor: number

      infoTable2.push(this.api.getReport(body).pipe(map(res =>{
        const param:any = {
          code: res.code,
          titulo: element.titulo,
          descripcion: element.descripcion,
          valor: res.data.value
        }
        return param
      })))
    });
    this.infoTable = infoTable2
    for (const iterator in this.infoTable) {
      this.arrayExcel[iterator] = true;
    }
    this.imprimir();
    console.log(this.infoTable)
  }

  reload(element: any, index: number){
    console.log(element, index)
    element.subscribe(res => {
      console.log(res.code)
    })
    const body = element.source.source.source.source.value.body
    this.infoTable[index] = this.api.getReport(body).pipe(map ( res => {
      const param:any = {
        code: '200',
        titulo: element.titulo,
        descripcion: element.descripcion,
        valor: res.data.value
      }
      return param
    }));
  }

  imprimir(){
    let seleccionados: any[] = [];
    for (let index = 0; index < this.arrayExcel.length; index++) {
      if(this.arrayExcel[index]){
        this.infoTable[index].subscribe( async res => await seleccionados.push(res))
      }      
    }
    this.arrayImprimir = seleccionados;
    return this.arrayImprimir
  }

}
