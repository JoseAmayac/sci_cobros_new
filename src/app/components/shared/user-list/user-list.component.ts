import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  @Input() usuarios:User[] = [];
  arregloTemp:User[];
  page:number = 1;

  textoBuscar:string = "";

  constructor() { }

  ngOnInit() {
    this.arregloTemp = this.usuarios;
  }

  buscar(event){
    this.textoBuscar = event.value;
    if (event.value === "") {
      this.usuarios = this.arregloTemp;
    }else{
      this.page = 1;
      this.usuarios = this.arregloTemp;
      this.usuarios = this.usuarios.filter( usuario =>{
        return usuario.name.toLocaleLowerCase().includes( event.value.toLowerCase() ) || 
               usuario.lastname.toLocaleLowerCase().includes(event.value.toLowerCase()) ||
               (usuario.name + " " + usuario.lastname).toLocaleLowerCase().includes(event.value.toLowerCase()) || 
               usuario.dni.toLocaleLowerCase().includes(event.value.toLowerCase())
      })
    }
  }

}
