import { Component, OnInit } from '@angular/core';
import { ManagerChatbotService } from '../../Services/manager-chatbot.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.css']
})
export class OverviewDetailComponent implements OnInit {

  infoTable: any[];
  dataTitle = {
    Fecha: 'date',
    "Numero de Usuario": 'userCount'
  }
  
  constructor( private route:ActivatedRoute, private mngService:ManagerChatbotService ) { }

  ngOnInit() {
    let dates = JSON.parse(this.route.snapshot.queryParamMap.get('date'))
    this.mngService.getOverview(dates).subscribe(data => {
      this.infoTable = data.data;
    })

  }

}
