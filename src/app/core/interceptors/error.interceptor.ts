import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { UtilsService } from "src/app/services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
      ) {}

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (!/^2\d*/.exec(err?.status.toString())) {
                // auto logout if 401 or 403 response returned from api
                if (err.status === 401) {
                  this.authService.logout();
                } else {
                  this.utilsService.showToast(err.error.error.message, 'danger');
                }
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => new Error(error));
        }))
    }
}
