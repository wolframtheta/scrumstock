import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreDTO } from '../core/dtos/stores';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDTO } from '../core/dtos/basic.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getStores(): Promise<StoreDTO[]> {
    return Promise.resolve((await lastValueFrom(this.httpClient.get<BasicDTO<StoreDTO[]>>(`${environment.urlServer}/stores`))).data);
  }
  async getStoresJoined(): Promise<StoreDTO[]> {
    return Promise.resolve((await lastValueFrom(this.httpClient.get<BasicDTO<StoreDTO[]>>(`${environment.urlServer}/stores/joined`))).data);
  }
  async getStoresByMe(): Promise<StoreDTO[]> {
    return Promise.resolve((await lastValueFrom(this.httpClient.get<BasicDTO<StoreDTO[]>>(`${environment.urlServer}/stores/me`))).data);
  }


  getStore(id: number): Promise<BasicDTO<StoreDTO>> {
    return lastValueFrom(this.httpClient.get<BasicDTO<StoreDTO>>(`${environment.urlServer}/stores/${id}`));
  }

  async joinStore(id: number) {
    const user: any = await lastValueFrom(this.httpClient.get(`${environment.urlServer}/users/me`));
    const store = await this.getStore(id);
    if (!store.data.users.some(u => u === user.username)) {
      const users = {
        connect: [user.id
        ]
      }
      return lastValueFrom(this.httpClient.put(`${environment.urlServer}/stores/${id}`, {data: {users}}));
    } else {
      // store.data.users.filter(u => u.username)
    }
    return false;
  }

  async separateJoin(id: number) {
    const user: any = await lastValueFrom(this.httpClient.get(`${environment.urlServer}/users/me`));
    const store = await this.getStore(id);
    if (store.data.users.some((u: any) => u.id === user.id)) {
      const users = {
        disconnect: [user.id
        ]
      }
      return lastValueFrom(this.httpClient.put(`${environment.urlServer}/stores/${id}`, {data: {users}}));
    } else {
      // store.data.users.filter(u => u.username)
    }
    return false;
  }
  createStore(data: any) {
    return lastValueFrom(this.httpClient.post(`${environment.urlServer}/stores`, { data }));
  }
}
