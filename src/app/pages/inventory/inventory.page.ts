import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ItemDTO } from 'src/app/core/dtos/items';
import { RouterLink } from '@angular/router';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { Storage } from '@ionic/storage-angular';
import { CreateItemComponent } from 'src/app/components/modals/create-item/create-item.component';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ItemCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryPage implements OnInit {

  items: ItemDTO[] = [];
  editMode: boolean = false;
  selectedStore!: number;
  constructor(
    private navController: NavController,
    private storage: Storage,
    private modalController: ModalController,
    private itemService: ItemService,
  ) { }

  async ngOnInit() {
    this.selectedStore = await this.storage.get('selectedStore');

    this.items = (await this.itemService.getItemsStore(this.selectedStore)).data

    await this.storage.set('editMode', this.editMode);
  }

  async changeEditMode() {
    this.editMode = !this.editMode;
    await this.storage.set('editMode', this.editMode);
  }

  async addItem() {
    const modal = await this.modalController.create({
      component: CreateItemComponent,
      componentProps: {
      }
    });

    modal.present();

    const res = (await modal.onDidDismiss()).data;
    if (res) {
      console.log('add');
    }
  }

  goTo(item: ItemDTO) {
    this.navController.navigateForward(`/tabs/inventory/${item.id}`, {state: {item}});
  }

  async ionViewDidEnter() {
    this.selectedStore = await this.storage.get('selectedStore');

    this.items = (await this.itemService.getItemsStore(this.selectedStore)).data

    await this.storage.set('editMode', this.editMode);
  }
}
