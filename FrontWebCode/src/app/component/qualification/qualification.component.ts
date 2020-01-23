import { Component, OnInit } from '@angular/core';
import { GraphData } from '../../Models/graphData';
import { InfoDateFilter } from '../../Models/InfoDateFilter';
import { AppComponent } from '../../app.component';
import { ManagerChatbotService } from '../../Services/manager-chatbot.service'
import {StorageSelectedBotService} from "../../storage/storage.selectedbot";
import { Router } from '@angular/router'


@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  processing = true;//Variable para el spiner
  infoGraphDatas: GraphData[];
  selectedHero: GraphData;
  public lineChartData: Array<any> = ['✰', '✰✰', '✰✰✰', '✰✰✰✰', '✰✰✰✰✰'];
  public lineChartLabels: Array<any> = [10, 10, 50, 20, 20];
  //Variable para bpruebas (BORRAR)
  cont = 0
  total: number;
  date;
  botSelected:any;
  viewDetailQualification:boolean= false;

  constructor(private parent: AppComponent, private mngChatbot: ManagerChatbotService, private router: Router,private selectBot : StorageSelectedBotService ) { }

  ngOnInit() {
    this.botSelected =this.selectBot.getSelectedBotSession();
    var selected= this.botSelected;
    //Recorrer parametriza para determinar si se visualiza el detalle de calificacion
    selected.ChatBot.forEach(element => {
      if(element.link=="qualification"){
        if(element.paginasHijas)
          element.paginasHijas.forEach(pageChildren => {
          if(pageChildren.link="detailQualification")
            this.viewDetailQualification=true;
        });
      }
    }); 
    
    var n = 0;
    //this.infoGraphDatas = [];
    this.lineChartData.forEach(element => {
      let graphData = new GraphData();
      graphData.key = element;
      graphData.value = this.lineChartLabels[n];
      n = n + 1;
      //Verifica que no sea undefined
      if(this.infoGraphDatas==undefined)
        this.infoGraphDatas = [];
      this.infoGraphDatas.push(graphData);
      this.selectedHero = graphData;
    })
  }


  //Metodo que recibe el rango de fechas del componente de fechas
  getRangeDate(rangeDate: InfoDateFilter) {
    this.total = 0
    this.date = rangeDate;
    console.log("LLEGO EL OPUTPUT" + JSON.stringify(this.date));
    //PRUEBA
    //this.infoGraphDatas = []
    if (rangeDate.code != 200) {
      this.parent.openDialog("", rangeDate.msg, "Alerta");
    } else {
      var pathChatbot = "";
      this.mngChatbot.getQualification(rangeDate).subscribe(
        result => {
          this.processing = false;
          if (result.code == 200) {
            console.log(result.data)
            this.infoGraphDatas = []
            result.data.forEach(element => {
              let graphData = new GraphData;
              graphData.key = element.key;
              graphData.value = element.value;
              this.total += element.value;
              this.infoGraphDatas.push(graphData)
              this.selectedHero = graphData;
            });
            console.log(this.infoGraphDatas);
          } else {
            console.log(JSON.stringify(result, null, 4));
            this.parent.openDialog("", result.description, "Alerta");
            this.infoGraphDatas = []
          }

        },
        error => {
          console.log(error);
          this.processing = false;
          this.parent.openDialog("", "Servidor no disponible", "Alerta");
        });

    }

  }

  getRatingDetail() {
    console.log(JSON.stringify(this.date))
    this.router.navigate(['home/qualification/ratingdetail'], {
      queryParams: { date: JSON.stringify(this.date) }
    })
  }
}
