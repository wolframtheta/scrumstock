import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDTO } from '../core/dtos/basic.dto';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getConfigServiceByKey(key: string): Promise<BasicDTO<any>> {
    return lastValueFrom(this.httpClient.get<BasicDTO<any>>(`${environment.urlServer}/config-services?filters[key][$eq]=${key}`));
  }

  updateConfigService(body: any, id: number) {
    return lastValueFrom(this.httpClient.put(`${environment.urlServer}/config-services/${id}`, {data: body}))
  }
}
