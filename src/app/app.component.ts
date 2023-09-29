import { Component, EnvironmentInjector, LOCALE_ID, importProvidersFrom, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { CartService } from './services/cart.service';
import { KEY_CART } from './core/constants/general';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthService } from './services/auth.service';

registerLocaleData(localeEs);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ]
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private storage: Storage,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    console.log('storage created', this.storage.driver);
    await this.storage.create();

    await this.storage.get(KEY_CART);
    const generalCart = await this.cartService.getGeneralCart();
    if (!generalCart) {
      const cart = this.cartService.initCart();
      await this.storage.set(KEY_CART, cart);
    }

    const idApp = await this.storage.get('idApp');
    if (!idApp) {
      await this.storage.set('idApp', 100);
    }

    const user = await this.authService.getToken();
    console.log(user);
  }
}
