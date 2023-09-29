import { Injectable } from '@angular/core';
import { CartDTO, ItemDTO, SalesItemDTO } from '../core/dtos/items';
import { Storage } from '@ionic/storage-angular';
import { KEY_CART } from '../core/constants/general';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storage: Storage
  ) { }

  addToCart(item: SalesItemDTO, cart: CartDTO): CartDTO {
    ++item.quantityAdded;
    const itemCart = cart.items.find((i: SalesItemDTO) => item.id === i.id);
    itemCart ? itemCart.quantityAdded = item.quantityAdded : cart.items.push(item);
    cart.total += item.price;
    return cart;
  }

  removeToCart(item: SalesItemDTO, cart: CartDTO): CartDTO {
    --item.quantityAdded;
    if (item.quantityAdded > 0) {
      const itemCart = cart.items.find((i: SalesItemDTO) => item.id === i.id);
      itemCart ? itemCart.quantityAdded = item.quantityAdded : cart.items = cart.items.filter((i: SalesItemDTO) => item.id !== item.id);
      cart.total -= item.price;
    } else {
      cart.items = cart.items.filter((i: SalesItemDTO) => i.id !== item.id);
      cart.total = cart.items.length > 0 ? cart.items?.map(item => item.price * item.quantityAdded)?.reduce((a, b) => a + b) : 0;
    }
    return cart;
  }

  addToCartSize(itemSales: SalesItemDTO, cart: CartDTO, item: ItemDTO) {
    this.addToCart(itemSales, cart);
    const itemF = item.sizes?.find(s => s.name === itemSales.size)
    if (itemF) {
      itemF.quantity = --itemF.quantity;
      item.quantity = --item.quantity
    }
    return {
      cart,
      item
    }
  }

  async initCart() {
    const cart: CartDTO = {
      items: [],
      total: 0
    }
    return cart;
  }


  async getGeneralCart() {
    const cart = await this.storage.get(KEY_CART);
    return cart;
  }

  async updateGeneralCart(cart: CartDTO) {
    await this.storage.set(KEY_CART, cart);
    return cart;
  }

}
