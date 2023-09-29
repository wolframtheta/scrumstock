import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDTO } from '../core/dtos/basic.dto';
import { ItemDTO } from '../core/dtos/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getItemsStore(id: number): Promise<BasicDTO<ItemDTO[]>> {
    return lastValueFrom(this.httpClient.get<BasicDTO<ItemDTO[]>>(`${environment.urlServer}/items/store/${id}`));
  }

  createItemStore(id: number, item: any) {
    return lastValueFrom(this.httpClient.post<ItemDTO>(`${environment.urlServer}/items/store/${id}`, item));
  }

  modifyItem(item: ItemDTO) {
    return lastValueFrom(this.httpClient.put<ItemDTO>(`${environment.urlServer}/items/${item.id}`, {data: item}));
  }
}
