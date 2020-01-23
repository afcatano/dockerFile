import { Component, OnInit , Input, OnChanges, SimpleChanges } from '@angular/core';
import {GraphData} from '../../Models/graphData';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';
@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.css']
})
export class PieGraphComponent implements OnInit {
  @Input() graphData: GraphData[];

  change:boolean = false
  constructor() { }

   // Configuracion del pie
  public pieChartType:string = 'pie';
  public pieChartLabels:string[] = ['✰', '✰✰', '✰✰✰', '✰✰✰✰', '✰✰✰✰✰'];
  public pieChartData:number[] = [];
  public pieChartOptions:any =  {"legend" : {"display": true,"position":"bottom",text:"usuarios","labels": { "boxWidth":10 ,"padding":5}},"title": {
    display: true,
    text: 'Calificación'
} ,
tooltips:  {
  callbacks: {
      label: function(tooltipItem, data) {
          var label = data.labels[tooltipItem.index] || '';
           if (label) {
              label += ': ';
          }
          var value =data.datasets[0].data[tooltipItem.index]; 
          var total = 0
          for (const iterator of data.datasets[0].data) {
            total += iterator            
          }
          label += Math.round(value * 100 / total);
          return label +"%";
      }
  }},
  layout: {
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}
};
  public randomizeType():void {
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    console.log("llega el data:"+this.graphData);
    console.log(this.graphData);
    this.pieChartData=[];
    this.pieChartLabels=[];
    let data= this.graphData;
    if(this.graphData)
      if(data.length>0){
        data.forEach(element => {
          this.pieChartData.push(Number(element.value));
          this.pieChartLabels.push(element.key);
        });   
      }else{
        console.log("No hay datos que mostrar en el grafico:"+this.graphData);
      }

  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //Detecta si hubo cambio y posteriormente recarga la grafica
      if( cur !== prev ){
        console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);        
        this.loadData();
        setTimeout( ()=>{
          this.change = true;
        }, 1000)
        this.change = false
      }

    }
    
  }

}
