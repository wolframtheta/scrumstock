import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      if (!(await this.authService.isAuthenticated())) {
        // if (this.platform.is('hybrid')) {
        //   await this.authService.refreshTokenNative().then((res) => {
        //     localStorage.setItem('refreshToken', res?.body?.refreshToken);
        //     localStorage.setItem('accessToken', res?.body?.accessToken);
        //     return this.authService.isAuthenticated()
        //   }).catch(() => {
        //     this.authService.logout();
        //     return false;
        //   })
        // } else {
        //   this.authService.refreshToken().then((res) => {
        //     localStorage.setItem('refreshToken', res?.refreshToken);
        //     localStorage.setItem('accessToken', res?.accessToken);
        //     return this.authService.isAuthenticated();
        //   }).catch(() => {
        //     this.authService.logout();
        //     return false;
        //   })
        // }
        // console.log('auth guard not auth')
        this.authService.logout();

        return false;
      }
      return Promise.resolve(true);
  }

}

