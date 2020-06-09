import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Route } from 'src/app/interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http:HttpClient) { }

  create(route:Route){
    return this.http.post(`${url}/routes`,route);
  }

  index(){
    return this.http.get<Route[]>(`${url}/routes`);
  }

  destroy(id){
    return this.http.delete(`${url}/routes/${id}`);
  }

  edit(id){
    return this.http.get(`${url}/routes/${id}`);
  }

  update(id:number,route:Route){
    return this.http.put(`${url}/routes/${id}`,route);
  }

}
