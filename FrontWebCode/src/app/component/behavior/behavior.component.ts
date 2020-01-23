import { Component, OnInit } from '@angular/core';
import { InfoDateFilter } from '../../Models/InfoDateFilter'
import { ManagerChatbotService } from '../../Services/manager-chatbot.service'
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.css']
})
export class BehaviorComponent implements OnInit {

  tree_data: any[];
  //Variable Spinner
  progress: boolean;

  constructor(private mngChatBot: ManagerChatbotService, private parent: AppComponent) { }

  ngOnInit() {
  }

  getRangeDate(rangeDate: InfoDateFilter) {
    this.progress = true;
    console.log(rangeDate)
    this.mngChatBot.getBehavior(rangeDate).subscribe((result: any) => {
      console.log(result)
      if (result.code == 200) {
        console.log(result.data)
        this.tree_data = result.data
        this.progress = false
      } else {
        console.log(JSON.stringify(result, null, 4));
        this.progress = false;
        this.parent.openDialog("", result.descripcion, "Alerta");
      }
    },
      (error: any) => {
        console.log(error);
        this.progress = false;
        this.parent.openDialog("", "Servidor no disponible", "Alerta");
      })
  }
}
