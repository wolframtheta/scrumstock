import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CartDTO, ItemDTO, SalesItemDTO } from 'src/app/core/dtos/items';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { KEY_CART } from 'src/app/core/constants/general';
import { Storage } from '@ionic/storage-angular';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ItemCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesPage implements OnInit {

  items: ItemDTO[] = [];
  cart!: CartDTO;
  private subject = new BehaviorSubject<CartDTO>(this.cart);
  obsCart = this.subject.asObservable();
  selectedStore!: number;

  constructor(
    private storage: Storage,
    private cartService: CartService,
    public navCtrl: NavController,
    private itemService: ItemService,
  ) {}

  async ngOnInit() {
    this.cart = await this.storage.get(KEY_CART);
    this.selectedStore = await this.storage.get('selectedStore');
    this.items = (await this.itemService.getItemsStore(this.selectedStore)).data

  }

  async addToCart(result: any) {
    this.cart = await this.cartService.addToCart(result.item, this.cart);
  }

  async removeToCart(result: any) {
    this.cart = await this.cartService.removeToCart(result.item, this.cart);
  }

  async resetCart() {
    const cart = this.cartService.initCart();
    await this.storage.set(KEY_CART, cart);
  }

  async ionViewDidEnter() {
    this.cart = await this.storage.get(KEY_CART);
    this.selectedStore = await this.storage.get('selectedStore');
    this.items = (await this.itemService.getItemsStore(this.selectedStore)).data
  }

}
