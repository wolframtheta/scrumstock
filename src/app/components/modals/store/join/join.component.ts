import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { StoreDTO } from 'src/app/core/dtos/stores';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreJoinComponent  implements OnInit {

  stores!: StoreDTO[];
  constructor(
    private modalCtrl: ModalController,
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.stores = await this.storeService.getStoresJoined();
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  joinStore(store: StoreDTO) {
    debugger
    return this.modalCtrl.dismiss(store);
  }

  async isJoined(store: StoreDTO) {
    const token = await this.authService.getToken();
    console.log(token.user);
    // if (store.users.some(user => user.id === token.user.name))
  }
}
