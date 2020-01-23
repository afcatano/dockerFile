import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //Datos necesarios para el table body
  @Input() data: any[];
  @Input() dataTitle: any;

  change = false;
  displayedColumns: string[] = [];
  dataSource

  display = [];
  size:number = 0

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {

  }

  updateTable() {

    if (this.data) {
      this.dataSource = new MatTableDataSource<any>(this.data)
      this.dataSource.paginator = this.paginator;
      if (this.data.constructor === Array) {
        this.size = this.data.length;
        this.dataSource.data = this.data.slice(0, 5)
      }else{
        const arreglo = []
        arreglo.push(this.data)
        this.size = arreglo.length;        
        this.dataSource.data = arreglo;
      }
      for (const key in this.dataTitle) {
        this.displayedColumns.push(key)
      }
    }
  }

  onPaginateChange(event) {
    //alert(JSON.stringify(event));
    const startIndex = event.pageIndex * event.pageSize;
    //     this.drugmap.getDrugDataForClient(startIndex, event.pageSize); 
    this.dataSource.data = this.data.slice(startIndex, startIndex + event.pageSize)
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      if (cur !== prev) {
        //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        this.updateTable()
        setTimeout(() => {
          this.change = true;
        }, 1000)
        this.change = false

      }
    }

  }

}
