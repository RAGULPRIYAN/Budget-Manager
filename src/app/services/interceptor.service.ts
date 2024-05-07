import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (localStorage.getItem('accessToken') && localStorage.getItem('sessionId')) {
    if (localStorage.getItem('accessToken')) {
console.log(localStorage.getItem('accessToken'),'token checks')
      request = request.clone({
        withCredentials : true,
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          sessionid : localStorage.getItem('sessionId') ?? ""
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status) {
              // this.util.errorToast(err.error?.message);
            } else {
              // this.util.errorToast('Connection failed');
            }
          }
        }
      )
    );
  }
}
