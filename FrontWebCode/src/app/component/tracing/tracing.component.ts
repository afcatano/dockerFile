import { Component, OnInit } from '@angular/core';
import { InfoDateFilter } from '../../Models/InfoDateFilter'
import { DataInfo } from '../../Models/DataFilter';
import { AppComponent } from '../../app.component'
import { ManagerChatbotService } from '../../Services/manager-chatbot.service'

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {

  params: DataInfo = {
    name: null,
    endDate: null,
    initialDate: null,
    documentId: null,
    documentType: null
  }
  
  //Variable para spinner
  progress:boolean = false;

  tracking;
  excelData;

  constructor(private parent: AppComponent, private mngChatbot: ManagerChatbotService) { }

  ngOnInit() {
  }

  //Metodo qyue recibe los filtros de nombre, tipo de documento y no de documento
  //Tambien es el encragado de realizar la consulta con los filtros seleccionados
  getFilters(filters: DataInfo) {
    this.progress = true;
    if (filters == undefined) {
      this.tracking = null
      this.progress = false
      this.params.name = null,
      this.params.documentId = null,
      this.params.documentType = null
    }
    else {
      if (filters.documentId && filters.documentType) {
        this.params['name'] = filters.name;
        this.params['documentId'] = filters.documentId;
        this.params['documentType'] = filters.documentType;
      } else {
        this.params['name'] = filters.name;
      }
      //Se realiza la peticion
      console.log(this.params)
      this.mngChatbot.getTracing(this.params).subscribe(
        (result: any) => {
          if (result.code == 200) {
            this.tracking = result.data
            this.setExcelData(result.data)
            this.progress = false;
          } else {
            console.log(JSON.stringify(result, null, 4));
            this.progress = false;
            this.tracking = null;
            this.parent.openDialog("", result.description, "Alerta");
          }
        },
        error => {
          console.log(error);
          this.progress = false;
          this.parent.openDialog("", "Servidor no disponible", "Alerta");
        });
    }


  }
  //Metodo que recibe el rango de fechas del componente de fechas
  getRangeDate(rangeDate: InfoDateFilter) {
    this.params['endDate'] = rangeDate.endDate;
    this.params['initialDate'] = rangeDate.initialDate;

  }

  setExcelData( data ){
    let arreglo = data[0].history;
    for (let index = 1; index < data.length; index++) {
      arreglo = arreglo.concat(data[index].history)      
    }    
    this.excelData = arreglo;
  }

}