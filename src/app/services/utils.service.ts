import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastController: ToastController
  ) { }

  async showToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: type
    });

    await toast.present();
  }
}
