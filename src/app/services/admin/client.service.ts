import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  index(){
    return this.http.get<User[]>(`${url}/clients`);
  }

  create(client:User){
    return this.http.post(`${url}/clients`,client);
  }
}
