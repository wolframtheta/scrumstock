import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
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

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos'
    })
    loading.present();
    return loading;
  }
}
