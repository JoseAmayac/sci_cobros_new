import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginGuard implements CanLoad {
  constructor(private authService:AuthService){

  }

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.validateAuthBefore();
  }
}
