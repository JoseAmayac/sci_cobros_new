import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/app/interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http:HttpClient) { }

  index(){
    return this.http.get<Vehicle[]>(`${url}/vehicles`);
  }

  create(vehicle:Vehicle){
    return this.http.post(`${url}/vehicles`,vehicle);
  }

  destroy(id:number){
    return this.http.delete(`${url}/vehicles/${id}`);
  }

  edit(id:number){
    return this.http.get(`${url}/vehicles/${id}`);
  }

  update(id:number,vehicle:Vehicle){
    return this.http.put(`${url}/vehicles/${id}`,vehicle);
  }

}
