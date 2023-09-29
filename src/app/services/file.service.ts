import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileDTO } from '../core/dtos/file.dto';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient,

  ) { }

  uploadFile(file: FileDTO) {
    if (typeof file.field === 'string') {
      console.log('s');
    }
    const formData = new FormData();
    file.files.forEach(file => {
      formData.append('files', file);
    })
    return lastValueFrom(this.httpClient.post(`${environment.urlServer}/upload`, formData))
  }
}
