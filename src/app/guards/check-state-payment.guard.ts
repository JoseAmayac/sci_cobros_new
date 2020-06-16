import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CheckStatePaymentGuard implements CanActivate {

  constructor(private service:AuthService, private router:Router){}

  canActivate(){
    console.log('Usando el check payment guard');
    
    return this.service.validatePayment()
  }
}
