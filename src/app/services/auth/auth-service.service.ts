import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { UiService } from '../ui/ui.service';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario:User = null;

  constructor(private http:HttpClient, 
              private tokenService:TokenService,
              private router:Router,
              private uiService:UiService) { }


  login(data){
    return this.http.post(`${url}/login`,data);
  }

  signUp(data){
    return this.http.post(`${url}/signup`,data)
  }

  getUser():Observable<User>{
    return this.http.get<User>(`${url}/me`)
  }

  async getLoggedUser(){
    if (!this.usuario) {
      await this.validateToken()
    }
    return this.usuario;
  }

  logout(){
    return this.http.get(`${url}/logout`)
  }

  requestAccessToken(){
    return this.http.get(`${url}/refresh`)
  }

  async logoutAlternative(acabada:boolean,validate?:boolean){
    await this.tokenService.getToken()
    this.tokenService.token = null;
    this.usuario = null;
    await this.tokenService.clearStorage()

    if (acabada) {
      this.uiService.showInfoMessage('Tú sesión ha caducado, vuelve a iniciar sesión para continuar','Sesión caducada')
    } else {
      if (!validate) {
        this.uiService.showWarningMessage('Algo salió mal con tu sesión actual, por favor ingresa nuevamente')
      }
    }
    this.router.navigateByUrl('/auth/login')
  }

  async validateToken(){
    let token = await this.tokenService.getToken();
    if(!token){
      this.logoutAlternative(false,true)
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
      this.getUser().subscribe(
        res=>{
          this.usuario = res
          return resolve(true)
        },
        err=>{
          this.logoutAlternative(false);
          return resolve(false)
        }
      )

    });
  }

  async validateAuthBefore():Promise<boolean>{
    let token = await this.tokenService.getToken();
    
    return new Promise<boolean>(resolve=>{
      if (token) {
        this.router.navigateByUrl('/dashboard');
        resolve(false)
      } else {
        resolve(true)
      }
    })
  }
}
