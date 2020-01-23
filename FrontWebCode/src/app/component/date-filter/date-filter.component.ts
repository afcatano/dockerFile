import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {InfoDateFilter} from '../../Models/InfoDateFilter';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  @Output() getRangeDate= new EventEmitter<InfoDateFilter>();

  
  
  v_initialDate = new FormControl(new Date());
  v_endDate = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  public initialDate;//Valor donde se almacena el rango de fecha inicial 
  public endDate;//Valor donde se almacena el rango de fecha final
  public rangeDate:boolean=false; //Bandera para activar o inactivar el rango de fecha

  //Constantes
  v_minInitialDate = new Date(2018, 4, 1);
  v_maxDateFist = new Date(2030, 4, 1);
  v_minEndDate = new Date(2018, 4, 1);
  v_maxEndDate = new Date(2030, 0, 1);
  day:number=24*60*60*1000;
  maxRange:number=31 //Maximo del rango;

  //Variables
  minInitialDate = this.v_minInitialDate;
  maxDateFist = this.v_maxDateFist;
  minEndDate = this.v_minEndDate;
  maxEndDate = this.v_maxEndDate;
  
 

  constructor() { }

  ngOnInit() {
    //Por defecto carga la ultima semana
    this.actionDate('week');
  }

  //Metodo que ejecuta por dia, semana, mes o rango de fechas las consulta a los bots
  actionDate(action){
    var fecha=new Date();
    var finishDay;
    var startDay;
    switch(action)
    {
      case "range":
        console.log(action);
        this.initialDate = undefined;
        this.endDate = undefined;
        this.rangeDate= true;
      break;
      case "day":
        this.rangeDate= false;
        this.initialDate = new Date (fecha.getTime());//.getFullYear() +"-"+fecha.getMonth()+"-"+fecha.getDate();
        this.endDate = new Date (fecha.getTime())//.getFullYear() +"-"+fecha.getMonth()+"-"+fecha.getDate();
        this.getInfo();
      break;
      case "week":
        var currentDay=fecha.getDay();
        var currentDate=fecha.getDay();
        var nextDay= 6- currentDate;//2 -> 4
        var vfinishDay = new Date (fecha.getTime() + (this.day*nextDay));
        var vstartDay = new Date (fecha.getTime() - (this.day*currentDate));
        this.initialDate = vstartDay;//.getFullYear() +"-"+vstartDay.getMonth()+"-"+vstartDay.getDate();
        this.endDate= vfinishDay;// .getFullYear() +"-"+vfinishDay.getMonth()+"-"+vfinishDay.getDate();
        this.rangeDate= false;
        this.getInfo();
      break;
      case "month":
          var primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
          var ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

          this.initialDate=  primerDia ;//.getFullYear() +"-"+fecha.getMonth()+"-"+ultimoDia.getDate();
          this.endDate = ultimoDia;//.getFullYear() +"-"+fecha.getMonth()+"-"+primerDia.getDate();
          this.rangeDate= false;
          this.getInfo();
      break;

    }
    
  }

  //Metodo que consulta a los bots por rango de fechas
  getInfo(){
    var dateObject= new InfoDateFilter();
          
    if(!(this.endDate && this.initialDate)){
      console.log("se debe definir rango de fecha !!");
      dateObject.msg="Se debe definir rango de fecha !!";
      dateObject.code=400;
      }
      else{
        dateObject.endDate=this.endDate.toISOString();
        dateObject.initialDate=this.initialDate.toISOString();
        
        var maxRange = new Date (this.initialDate.getTime() + (this.day*this.maxRange));
        console.log("El rango rango:"+maxRange);
        if(maxRange < this.endDate){
          console.log("El rango no puede superar mas de un mes!!");
          dateObject.msg="El rango no puede superar mas de un mes!!";
          dateObject.code=400;
        }else{
          

        dateObject.endDate=  this.endDate.getFullYear() +"-"+(this.endDate.getMonth()+1)+"-"+ this.endDate.getDate();
        dateObject.initialDate=  this.initialDate.getFullYear() +"-"+(this.initialDate.getMonth()+1)+"-"+ this.initialDate.getDate();
        console.log("rango de fecha inicial:"+dateObject.initialDate )
          console.log("rango de fecha final:"+dateObject.endDate) 
           dateObject.msg="";
          dateObject.code=200;
        }
    }
    this.getRangeDate.emit(dateObject);
  }

  //Evento que captura el input de los rangos de fecha
  addEvent(type: string, event: MatDatepickerInputEvent<Date>, dateInput: string) {
    var fecha = event.value;
    console.log(fecha);
    if(fecha && fecha!=null){
      if("endDate"==dateInput)
      {
        this.endDate= fecha;//.getFullYear() +"-"+fecha.getMonth()+"-"+fecha.getDate();
        console.log("endDate");
      }
      else
      {
        this.initialDate= fecha;//.getFullYear() +"-"+fecha.getMonth()+"-"+fecha.getDate();
        var vfinishDay = new Date (fecha.getTime() + (this.day*this.maxRange));
        this.minEndDate = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        this.maxEndDate = new Date(vfinishDay.getFullYear(), vfinishDay.getMonth(), vfinishDay.getDate());
        console.log("initialDate");
      }
    }else{
      if("endDate"==dateInput)
       {
          this.endDate= undefined;
           console.log("entra");
        }
      else
      {
        this.initialDate= undefined;
         console.log("sale");
      }
    }
  }
}
