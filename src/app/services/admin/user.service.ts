import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralInformation } from 'src/app/interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private autService:AuthService,
              private http:HttpClient) { }

  getUser(){
    return this.autService.getLoggedUser()
  }

  getInformation(){
    return this.http.get<GeneralInformation>(`${url}/general`);
  }
}
