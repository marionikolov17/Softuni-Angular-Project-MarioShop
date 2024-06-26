import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from './core/error/error.service';

const apiUrl = "http://localhost:3000"

@Injectable()
class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router, private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith("/api")) {
      request = request.clone({
        url: request.url.replace("/api", apiUrl),
        withCredentials: true
      });
    }

    return next.handle(request).pipe(
      /* catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
        }

      }) */
    )
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
