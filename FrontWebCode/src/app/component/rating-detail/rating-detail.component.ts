import { Component, OnInit, Input } from '@angular/core';
import { ManagerChatbotService } from '../../Services/manager-chatbot.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.css']
})
export class RatingDetailComponent implements OnInit {
  infoTable: any[]
  size:number
  dataTitle = {
    'Fecha':"date",
    'Tipo Documento': 'documentType',
    'Documento': 'document',
    'Nombre':'name',
    'Calificacion': 'rating',
    'Comentarios':'comment',
    'PureCloud':'pureCloud'
  }

  constructor(private mngService: ManagerChatbotService, private route: ActivatedRoute) { }

  ngOnInit() {
    let dates = JSON.parse(this.route.snapshot.queryParamMap.get('date'))
    this.mngService.getDetail(dates).subscribe((data: any) => {
      this.infoTable = data.data
      console.log(this.infoTable)
      this.size = this.infoTable.length
    })

  }

  average():string {
    let average = 0
    if (this.infoTable){
      this.infoTable.forEach(element => {
        if (element.rating) {
          average += element.rating.length;
        }
      });
      average = average/this.size
    }
    
    return average.toFixed(2)
  }

}
