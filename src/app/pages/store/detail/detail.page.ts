import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogsService } from 'src/app/services/logs.service';
import { LogDTO } from 'src/app/core/dtos/log.dto';
import { TicketSaleComponent } from 'src/app/components/ticket-sale/ticket-sale.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TicketSaleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailPage implements OnInit {

  constructor(
  ) { }


  log!: LogDTO;
  ngOnInit() {
    this.log = window.history.state?.log;
    console.log(this.log)
  }

}
