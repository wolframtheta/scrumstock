import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CartDTO, ItemDTO, SalesItemDTO, SizeItem } from 'src/app/core/dtos/items';
import { CartService } from 'src/app/services/cart.service';
import { KEY_CART, TYPES_LOG, YES_NO_ALERT_BUTTONS } from 'src/app/core/constants/general';
import { Storage } from '@ionic/storage-angular';
import { ItemService } from 'src/app/services/item.service';
import { LogsService } from 'src/app/services/logs.service';
import { LogDTO } from 'src/app/core/dtos/log.dto';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { TicketSaleComponent } from 'src/app/components/ticket-sale/ticket-sale.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TicketSaleComponent
  ]
})
export class CheckoutPage implements OnInit {

  cart!: CartDTO;
  items: ItemDTO[] = [];
  alertButtons = YES_NO_ALERT_BUTTONS;
  selectedStore!: number;
  itemsList: ItemDTO[] = [];
  form!: FormGroup;
  constructor(
    private cartService: CartService,
    private storage: Storage,
    private navController: NavController,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private logsService: LogsService,
    private authService: AuthService,
    private storeService: StoreService
  ) {
    this.form = this.formBuilder.group({
      client: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadPage();
  }

  async loadPage() {
    this.cart = await this.cartService.getGeneralCart();
    this.selectedStore = await this.storage.get('selectedStore');
    this.cart?.items.map((item: SalesItemDTO) => {
      item['img'] = this.items.find((i) => i.id === item.id || i.id === item.idFather)?.img
      return item;
    })
  }

  async cancelSale(event: any) {
    const action = event.detail.role;
    if (action === YES_NO_ALERT_BUTTONS[1].role) {
      await this.resetCart();
      this.navController.navigateRoot(`/tabs/${this.selectedStore}/sales`)
    }
  }

  async confirmSale(event: any) {
    const action = event.detail.role;
    if (action === YES_NO_ALERT_BUTTONS[1].role) {
      console.log(this.cart);
      this.itemsList = (await this.itemService.getItemsStore(this.selectedStore)).data;
      this.cart?.items.forEach(item => {
        this.saleItem(item)
      })
      this.itemsList.forEach(async item => {
        await this.itemService.modifyItem(item);
      })
      const log: LogDTO = {
        client: this.form.value.client,
        description: `Items: ${this.cart?.items.map((item: SalesItemDTO) => `${item.name} ${item.size ?? ''} - ${item.quantityAdded}`).join(', ')}`,
        total: this.cart?.total ?? 0,
        type: TYPES_LOG.SALE,
        store: (await this.storeService.getStore(this.selectedStore)).data,
        data: this.cart
      }
      await this.logsService.insertLog(log);
      await this.resetCart();
      this.navController.navigateRoot(`/tabs/${this.selectedStore}/sales`)
    }
  }

  saleItem(item: SalesItemDTO) {
    if (item.idFather) {
      if (this.itemsList && this.itemsList.length > 0) {
        this.itemsList.map(i => {
          if (i.id === item.idFather) {
            i.sizes?.map(iS => {
              if (iS.id === item.id) {
                iS.quantity -= item.quantityAdded;
              }
              return iS;
            })
            i.quantity -= item.quantityAdded;
          }
          return i;
        });
      }
    } else {
      this.itemsList.map(i => {
        if (i.id === item.id) {
          i.quantity -= item.quantityAdded;
        }
        return i;
      })
    }
  }

  async resetCart() {
    const newCart = this.cartService.initCart();
    await this.storage.set(KEY_CART, newCart);
  }

}
