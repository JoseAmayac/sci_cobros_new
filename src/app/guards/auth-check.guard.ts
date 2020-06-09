import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanLoad {
  constructor(private service:AuthService){

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.validateToken();
  }
}
