import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanActivate{
  constructor(private service:AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let ruta = route.data.ruta;
    
    if (ruta) {
      return this.service.validateToken(ruta);
    }
  }
}
