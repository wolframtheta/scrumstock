import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  compressBase64(src: string, quality = 1, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `data:image/jpeg;base64,${src}`;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const canvas = document.createElement('canvas');
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas?.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      }
    })
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100,
      width: 500,
      height: 500
    });
    return photo;
  }
}
