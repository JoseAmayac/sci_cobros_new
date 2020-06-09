import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario:User = null;

  constructor(private http:HttpClient, 
              private tokenService:TokenService,
              private router:Router) { }


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

  async logoutAlternative(acabada:boolean){
    await this.tokenService.getToken()
    this.tokenService.token = null;
    this.usuario = null;
    await this.tokenService.clearStorage()

    if (acabada) {
      // this.uiService.mostrarSesionAcabada('Tú sesión ha caducado, vuelve a iniciar sesión para continuar')
    } else {
      // this.uiService.mostrarSesionAcabada('Algo salió mal con tu sesión actual, por favor ingresa nuevamente')
    }
    this.router.navigateByUrl('/login')
  }

  async validateToken(){
    let token = await this.tokenService.getToken();

    if(!token){
      this.logoutAlternative(false)
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
      this.getUser().subscribe(
        res=>{
          this.usuario = res
          return resolve(true)
        },
        err=>{this.logoutAlternative(false);
          return resolve(false)
        }
      )

    });
  }
}
