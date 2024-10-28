import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogDTO } from '../core/dtos/log.dto';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDTO, NativeDTO } from '../core/dtos/basic.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  async insertLog(log: LogDTO) {
    const user = (await this.authService.getToken()).user
    log.user = user.id
    return lastValueFrom(this.httpClient.post<Promise<BasicDTO<LogDTO>>>(`${environment.urlServer}/logs`, {data: log}));

  }

  getLogsByStore(idStore: number): Promise<NativeDTO<LogDTO[]>> {
    return lastValueFrom(this.httpClient.get<NativeDTO<LogDTO[]>>(`${environment.urlServer}/logs/?filters[$and][0][store][id][$eq]=${idStore}`));
  }

  updateLog(log: LogDTO) {
    return lastValueFrom(this.httpClient.put<Promise<BasicDTO<LogDTO>>>(`${environment.urlServer}/logs/${log.id}`, {data: log}))
  }

  deleteLog(log: LogDTO) {
    return lastValueFrom(this.httpClient.delete<Promise<BasicDTO<LogDTO>>>(`${environment.urlServer}/logs/${log.id}`))
  }
}
