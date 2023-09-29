import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogDTO } from '../core/dtos/log.dto';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDTO } from '../core/dtos/basic.dto';
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
    const res: BasicDTO<LogDTO> = await lastValueFrom(this.httpClient.post<Promise<BasicDTO<LogDTO>>>(`${environment.urlServer}/logs`, {data: log}));
    const users = {
      connect: [(await this.authService.getToken()).user.id
      ]
    }
    return lastValueFrom(this.httpClient.put(`${environment.urlServer}/logs/${res.data.id}`, {data: {users}}));
  }

  getLogsByStore(idStore: number): Promise<BasicDTO<LogDTO[]>> {
    return lastValueFrom(this.httpClient.get<BasicDTO<LogDTO[]>>(`${environment.urlServer}/logs/${idStore}`));
  }
}
