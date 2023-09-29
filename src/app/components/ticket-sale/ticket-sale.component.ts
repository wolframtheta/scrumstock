import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartDTO } from 'src/app/core/dtos/items';

@Component({
  selector: 'app-ticket-sale',
  templateUrl: './ticket-sale.component.html',
  styleUrls: ['./ticket-sale.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    TicketSaleComponent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketSaleComponent  implements OnInit {

  @Input() cart!: CartDTO;
  constructor() { }

  ngOnInit() {
    console.log(this.cart);
  }

}
