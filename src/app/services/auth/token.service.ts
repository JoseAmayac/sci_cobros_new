import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token:string = null;

  constructor(private router:Router) { }

  async createToken(token)
  {
    await localStorage.setItem('token',token)
  }

  async getToken()
  {
    this.token =  await localStorage.getItem('token') || null;

    return this.token;
  }

  async clearStorage(){
    this.token = null;
    await localStorage.clear()
  }
}
