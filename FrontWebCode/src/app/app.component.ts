import { Component, OnInit } from '@angular/core';
import { MessageComponent } from './component/message/message.component';
import {MatDialog} from '@angular/material';
import { ParameterService } from './Services/parameter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

 
  constructor(public dialog: MatDialog, private params:ParameterService) {
    this.OnInit();
  }

  OnInit(){
  }
  openDialog( icon,msg,title): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '250px',
      data: {icon: icon, msg: msg, title: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
