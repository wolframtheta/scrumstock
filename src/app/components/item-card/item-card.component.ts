import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartDTO, ItemDTO, SalesItemDTO, SizeItem } from 'src/app/core/dtos/items';
import { MapperService } from 'src/app/services/mapper.service';
import { SizesComponent } from '../modals/sizes/sizes.component';
import { CartService } from 'src/app/services/cart.service';
import { KEY_CART } from 'src/app/core/constants/general';
import { Storage } from '@ionic/storage-angular';
import * as _ from 'lodash';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemCardComponent  implements OnInit {

  @Input() item!: ItemDTO;
  @Input() size!: SizeItem;
  @Input() editMode!: boolean;
  salesItem!: SalesItemDTO;
  @Output() addToCart = new EventEmitter<any>();
  @Output() removeToCart = new EventEmitter<any>();
  constructor(
    public router: Router,
    private mapperService: MapperService,
    private modalController: ModalController,
    private cartService: CartService,
    private storage: Storage,
    private itemService: ItemService
  ) { }

  async ngOnInit() {
    if (!this.salesItem) {
      this.salesItem = this.mapperService.itemDTOToSalesItemDTO(this.item);
      const cart: CartDTO = await this.cartService.getGeneralCart();
      const findItemCart = cart.items?.find((item: SalesItemDTO) => item.id === this.item.id || item.idFather === this.item.id);
      this.salesItem = this.mapperService.itemDTOToSalesItemDTO(this.item, findItemCart);
      if (this.item.sizes?.length) {
        this.salesItem.idFather = this.item.id;
      }
    }
  }

  async addItem() {
    if (this.item.sizes) {
      const modal = await this.modalController.create({
        component: SizesComponent,
        componentProps: {
          item: this.item
        }
      });
      modal.present();
      modal.onWillDismiss().then(async res => {
        if (res.data) {
          const cart: CartDTO = await this.storage.get(KEY_CART);

          const mergedCart: CartDTO = await this.cartService.initCart();

          res.data.cart.items.forEach((itemRes: SalesItemDTO) => {
            // const findCartItem = cart.items.find(item => item.id === itemRes.id);
              mergedCart.items.push(itemRes);
          })
          cart.items.forEach((itemRes: SalesItemDTO) => {
            const findCartItem = res.data.cart.items.find((item: SalesItemDTO) => item.id === itemRes.id);
            if (!findCartItem) {
              mergedCart.items.push(itemRes);
            }
          })
          const prices = mergedCart.items.map(item => item.price*item.quantityAdded);
          mergedCart.total = prices.reduce((prev, item) => prev + item)
          await this.storage.set(KEY_CART, mergedCart);
          debugger
          this.salesItem.isAdded = mergedCart.items.some((item: SalesItemDTO) => item.id === this.salesItem.id);
        }
      });
    } else {
      this.salesItem = this.mapperService.itemDTOToSalesItemDTO(this.item);
      this.salesItem.isAdded = true;
      this.salesItem.quantity = 1;
      --this.item.quantity;
      this.addToCart.emit({
        salesItem: this.salesItem,
        item: this.item
      });
    }
  }

  async add(event?: any) {
    if (this.editMode) {
      ++this.item.quantity;
      this.itemService.modifyItem(this.item);
    } else {
      let cart: CartDTO = await this.cartService.getGeneralCart();
      cart = this.cartService.addToCart(this.salesItem, cart);
      await this.cartService.updateGeneralCart(cart);
    }
  }

  async remove(event?: any) {
    if (this.editMode) {
      --this.item.quantity;
      this.itemService.modifyItem(this.item);
    } else {
      let cart: CartDTO = await this.cartService.getGeneralCart();
      cart = this.cartService.removeToCart(this.salesItem, cart);
      await this.cartService.updateGeneralCart(cart);
    }

  }



}
