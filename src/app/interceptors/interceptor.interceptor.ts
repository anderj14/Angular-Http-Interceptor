import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string | undefined = localStorage.getItem('token')!;

    if(token){
      request = request.clone({
        setHeaders:{
          authorization: `Fearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if(err.status === 404){
            this.route.navigate(['./home']);
          }
        }
      })
    );
  }
}
