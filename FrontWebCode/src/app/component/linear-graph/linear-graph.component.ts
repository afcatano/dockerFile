import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GraphData } from '../../Models/graphData';
import { AppComponent } from '../../app.component'
@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.css']
})
export class LinearGraphComponent implements OnInit {
  @Input() graphData: GraphData[];
  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartType: string = 'line';
  public lineChartOptions: any = {
    "legend": { "display": false, "position": "bottom", text: "Proveedores", "boxWidth": 1, "labels": { "fontColor": 'rgb(255, 99, 132)' } }, "title": {
      display: true,
      text: 'Proveedores'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value) { if (Number.isInteger(value)) { return value; } }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label = " Usuarios "
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      }
    }
  };
  change: boolean = false;

  constructor(private parent: AppComponent) {
  }

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public updateGraph() {
    this.lineChartData = [];
    this.lineChartLabels = [];
    let data = this.graphData;
    if (this.graphData)
      if (data.length > 0) {
        data.forEach(element => {
          this.lineChartData.push(element.key);
          this.lineChartLabels.push(element.value);
        });
      } else {
        //console.log("No hay datos que mostrar en el grafico:"+this.graphData);
        //this.parent.openDialog( "","No hay datos que mostrar en el grafico","Respuesta");
      }
  }

  ngOnInit() {
    console.log("llega el data:" + this.graphData);
    this.updateGraph()
  }

  //Metodo propio de angular encargado de ver los cambios en mis decoradores input
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //Detecta si hubo cambio y posteriormente recarga la grafica
      if (cur !== prev) {
        console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        this.updateGraph();
        setTimeout(() => {
          this.change = true;
        }, 1000)
        this.change = false
      }

    }
  }


}
