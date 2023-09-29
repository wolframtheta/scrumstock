import { Injectable } from '@angular/core';
import { ItemDTO, SalesItemDTO, SizeItem } from '../core/dtos/items';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  itemDTOToSalesItemDTO(item: ItemDTO, itemAdded?: SalesItemDTO): SalesItemDTO {
    const salesItem: SalesItemDTO = {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      quantityAdded: itemAdded?.quantityAdded ?? 0,
      isAdded: itemAdded ? true : false,
      price: item.price,
    }
    return salesItem;
  }

  itemSizeToSalesItemDTO(sizeItem: SizeItem, itemFather: ItemDTO, itemAdded?: SalesItemDTO): SalesItemDTO {
    const salesItem: SalesItemDTO = {
      id: sizeItem.id,
      name: itemFather.name,
      quantity: sizeItem.quantity,
      quantityAdded: itemAdded?.quantityAdded ?? 0,
      isAdded: itemAdded ? true : false,
      price: itemFather.price,
      size: sizeItem.name,
      idFather: itemFather.id
    }
    return salesItem;
  }
}
