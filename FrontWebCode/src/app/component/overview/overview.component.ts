import { Component, OnInit } from '@angular/core';
import {GraphData} from '../../Models/graphData';
import {InfoDateFilter} from '../../Models/InfoDateFilter';
import { AppComponent } from '../../app.component';
import { ManagerChatbotService } from '../../Services/manager-chatbot.service';
import { Router,  } from '@angular/router';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  processing = true;//Variable para el spiner
  infoGraphDatas:GraphData[];
  selectedHero:GraphData;
  public lineChartData:Array<any> =  [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //Variable de prueba (BORRAR)
  cont = 0;
  date;
  
  constructor(private parent: AppComponent,private router: Router,private mngChatbot:ManagerChatbotService) { 
    //Si no esta definido se debe ir al home para seleccionar un bot
    
   }

  eventoClick(){
    
  }
  
  ngOnInit() {
    
    var n=0;
    this.infoGraphDatas=[];
    this.lineChartData.forEach(element => {
      let graphData = new GraphData();
      graphData.key=element;
      graphData.value=this.lineChartLabels[n];
       n=n+1;
      this.infoGraphDatas.push(graphData);
      this.selectedHero=graphData;
   });  
   console.log("select a enviar :"+this.selectedHero);
 
   console.log("se han llenado los datos para enviar al componente de estadistica :"+this.infoGraphDatas);
  }

  getOverviewDetail(){
    this.router.navigate(['home/overview/detail'], {
      queryParams: {date: JSON.stringify(this.date)}
    })

  }

  
  //Metodo que recibe el rango de fechas del componente de fechas
  getRangeDate(rangeDate: InfoDateFilter) {

    this.date = rangeDate;

    //PRUEBA
    this.infoGraphDatas=[]
    //Fin Prueba


    let graphData = new GraphData();
    graphData.key = "8000";
    graphData.value = "Carulla";
    let graphDatas = new GraphData();
    graphDatas.key = "7000";
    graphDatas.value = "Exito";
    let graphDatas1 = new GraphData();
    graphDatas1.key = "3000";
    graphDatas1.value = "Olimpica";
    let graphDatas2 = new GraphData();
    graphDatas2.key = "5000";
    graphDatas2.value = "Exito";
    this.infoGraphDatas.push(graphDatas2);
    this.infoGraphDatas.push(graphDatas1);
    this.infoGraphDatas.push(graphDatas);
    this.infoGraphDatas.push(graphData);
    
   /* if(rangeDate.code!=200)
    {
      this.parent.openDialog( "",rangeDate.msg,"Alerta");
    }else{
      var pathChatbot="";
      this.mngChatbot.getOverview(rangeDate).subscribe(
        result => {
          this.processing = false;
         if(result.code==200) {
           console.log(result);
           this.infoGraphDatas=[]
           result.data.forEach((element, index) => {
                let graphData = new GraphData();
                graphData.key = element.userCount;
                graphData.value = element.date;
                this.infoGraphDatas.push(graphData);
                this.selectedHero=graphData;
            });
          } else {
           console.log(JSON.stringify(result, null, 4));
           this.parent.openDialog( "",result.description,"Alerta");
           this.infoGraphDatas=[]
         }
     },
     error => {
         console.log(error);
         this.processing = false;
         this.parent.openDialog( "","Servidor no disponible","Alerta");
      });

    }*/
  }

}
