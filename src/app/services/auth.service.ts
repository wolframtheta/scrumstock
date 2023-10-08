import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage-angular';
import { lastValueFrom } from 'rxjs';
import { LoginDTO, RegisterDTO } from '../core/dtos/login';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private storage: Storage,
    private httpClient: HttpClient,
    private navController: NavController
  ) { }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token.jwt);
    }
    return false;
  }

  async login(body: LoginDTO) {
    return lastValueFrom(this.httpClient.post(`${environment.urlServer}/auth/local?populate=*`, body))
  }

  getMe() {
    return lastValueFrom(this.httpClient.get(`${environment.urlServer}/users/me?populate=*`));
  }

  async logout() {
    await this.storage.clear();
    this.navController.navigateRoot('/login');
  }

  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }

  async isRole(role: string | string[]): Promise<boolean> {
    const token = await this.storage.get('token');
    if (typeof role === 'string') {
      return token.user.role.type === role;
    } else {
      return role.some(r => r === token.user.role.type);
    }
  }

  register(body: RegisterDTO) {
    return lastValueFrom(this.httpClient.post(`${environment.urlServer}/users`, body));
  }
}
