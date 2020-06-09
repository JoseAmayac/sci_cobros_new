import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token:string = "";

  constructor() { }

  async createToken(token)
  {
    await localStorage.setItem('token',token)
  }

  async getToken()
  {
    return this.token =  await localStorage.getItem('token');
  }

  async clearStorage(){
    await localStorage.clear()
  }
}
