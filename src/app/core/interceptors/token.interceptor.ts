import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable, catchError, from, lastValueFrom } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { UtilsService } from "src/app/services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
      ) {}

      intercept(request: HttpRequest<unknown>, next: HttpHandler) {

        return from(this.handle(request, next))
      }

      async handle(request: HttpRequest<unknown>, next: HttpHandler) {
        if (!request.url.includes('auth')) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${(await this.authService.getToken()).jwt}`
            }
          })
        }
        return lastValueFrom(next.handle(request));
      }
}
