import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { StoreDTO } from 'src/app/core/dtos/stores';
import { StoreService } from 'src/app/services/store.service';
import { RouterModule } from '@angular/router';
import { StoreJoinComponent } from 'src/app/components/modals/store/join/join.component';
import { StoreCreateComponent } from 'src/app/components/modals/store/create/create.component';
import { FileService } from 'src/app/services/file.service';
import { FileDTO } from 'src/app/core/dtos/file.dto';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

  stores!: StoreDTO[];
  constructor(
    private storeService: StoreService,
    private modalController: ModalController,
    private storage: Storage,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.loadPage();
  }

  async loadPage() {
    this.stores = (await this.storeService.getStoresByMe());

  }

  async createStore() {
    const modal = await this.modalController.create({
      component: StoreCreateComponent
    })
    await modal.present()

    const data = (await modal.onDidDismiss()).data
    if (data) {
      await this.storeService.createStore(data);
      await this.loadPage();
    }
  }

  async joinStore() {
    const modal = await this.modalController.create({
      component: StoreJoinComponent
    })
    await modal.present()

    const data: StoreDTO = (await modal.onDidDismiss()).data
    if (data) {
      debugger
      if (data.isJoined) {
        await this.storeService.separateJoin(data.id);
      } else {
        await this.storeService.joinStore(data.id);
      }
      this.stores = (await this.storeService.getStoresByMe());
    }
  }

  async logout() {
    await this.storage.clear();
    this.navController.navigateRoot(['/login']);
  }
}
