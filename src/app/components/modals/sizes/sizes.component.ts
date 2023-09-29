import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartDTO, ItemDTO, SalesItemDTO, SizeItem } from 'src/app/core/dtos/items';
import { CartService } from 'src/app/services/cart.service';
import { MapperService } from 'src/app/services/mapper.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SizesComponent  implements OnInit {

  @Input() item!: ItemDTO;
  sizeItems: SalesItemDTO[] = [];
  cart!: CartDTO;
  constructor(
    private modalCtrl: ModalController,
    private mapperService: MapperService,
    private cartService: CartService,
    ) {}

  ngOnInit() {
    this.loadModal();
  }

  async loadModal() {
    this.cart = await this.cartService.initCart();
    const generalCart: CartDTO = await this.cartService.getGeneralCart();
    if (this.item.sizes) {
      this.sizeItems = this.item.sizes.map(size => this.mapperService.itemSizeToSalesItemDTO(size, this.item, generalCart.items.find(i => i.id === size.id)))
    }
  }


  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    return this.modalCtrl.dismiss({ cart: this.cart });
  }

  async addItem(item: SalesItemDTO) {
    this.cart = await this.cartService.addToCart(item, this.cart);
    console.log(this.cart)
  }

  async removeItem(item: SalesItemDTO) {
    const generalCart = await this.cartService.getGeneralCart();
    this.cart = await this.cartService.removeToCart(item, generalCart);
    // const quantityItem = this.cart.items.find(itemCart => itemCart.id === item.id)?.quantity
    // if (!quantityItem) {
    //   item.isAdded = false;
    // }
    console.log(this.cart)
  }


}
