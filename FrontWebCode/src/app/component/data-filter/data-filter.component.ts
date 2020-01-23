import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataInfo } from '../../Models/DataFilter'
import { StorageSelectedBotService } from '../../storage/storage.selectedbot'


@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit {
  @Output() getDataFilter = new EventEmitter<DataInfo>()

  data: DataInfo = {
    name: "",
    documentId: null,
    documentType: null,
  }

  constructor(public selectedBot: StorageSelectedBotService) { }

  ngOnInit() {
  }

  // Metodo que crea el evento para ser escuchado por el padre
  send() {
    this.getDataFilter.emit(this.data)
  }

  clear() {
    this.data = {
      name: "",
      documentId: null,
      documentType: null,
    }
    this.getDataFilter.emit();
  }

}
