import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators'; 
import { AuthService } from '../services/auth/auth-service.service';
import { TokenService } from '../services/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService, private tokenService:TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(
        catchError(err=>{
          const error = (typeof err.error !== 'object') ? JSON.parse(err.error) : err

          if (err.status === 401 && error.error.err === 'token_expired') {
            if (!this.refreshTokenInProgress) {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
              return this.authService.requestAccessToken().pipe(
                switchMap((authResponse)=>{
                  this.tokenService.createToken(authResponse['access_token']);
                  this.tokenService.getToken()
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(authResponse['access_token']);
                  return next.handle(this.injectToken(request));
                }),
                catchError((err)=>{
                  this.refreshTokenInProgress = false;
                  this.authService.logoutAlternative(true)
                  return next.handle(this.injectToken(request))
                })
              )
            }else{
              return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                  return next.handle(this.injectToken(request))
                })
              );
            }
          }else{
            if (err.status === 401 && error.error.err === 'token_invalid') {
              this.authService.logoutAlternative(false);
              return next.handle(this.injectToken(request))
            }else{
              if (err.status === 404 && error.error.err === 'token_not_found') {
                this.authService.logoutAlternative(false);
                return next.handle(this.injectToken(request))
              }
            }
          }
          return throwError(err)
        })
      )
    }

    injectToken(request: HttpRequest<any>) {
      const token =  localStorage.getItem('token')
      
      return request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
    }
  
}
