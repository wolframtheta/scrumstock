import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private configService: ConfigServiceService
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

  async getIdApp() {
    const configService = (await this.configService.getConfigServiceByKey('idApp')).data;
    if (configService.length > 0) {
      await localStorage.setItem('idIdApp', configService[0].id);
      return configService[0].attributes.value;
    }
    return null;
  }

  async setIdApp(idApp: number) {
    const idIdApp = await localStorage.getItem('idIdApp');
    if (idIdApp) {
      await this.configService.updateConfigService({
        value: idApp
      }, +idIdApp);
    }
  }
}
