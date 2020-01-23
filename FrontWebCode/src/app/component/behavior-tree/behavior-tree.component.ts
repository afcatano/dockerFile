import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { FileFlatNode } from '../../Models/FileFlatNode'

@Component({
  selector: 'app-behavior-tree',
  templateUrl: './behavior-tree.component.html',
  styleUrls: ['./behavior-tree.component.css']
})
export class BehaviorTreeComponent implements OnInit {
  @Input() data: any[]
  dataChange: BehaviorSubject<any[]>;
  treeControl: FlatTreeControl<any>;
  treeFlattener: MatTreeFlattener<any, any>;
  dataSource: MatTreeFlatDataSource<any, any>;
  //database: FileDatabase

  constructor() {
    //this.database =  new FileDatabase(this.data)
    this.dataChange = new BehaviorSubject<any[]>([]);
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<any>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //Detecta si hubo cambio y posteriormente recarga la grafica
      if( cur !== prev ){
        this.update();
      }

    }
  }

  update() {
    this.dataChange.next(this.data)
    this.dataChange.subscribe(data => {
      this.dataSource.data = data
    })
  }

  transformer = (node: any, level: number) => {
    return new FileFlatNode(!!node.children, node.name, level, node.quantity);
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: any): Observable<any[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

}
