import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';

import { User } from 'src/app/interfaces/interfaces'

declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  user:User;

  //Esto lo debo sacar en un servicio personalizado
  opciones = [
    {
      title:'Dashboard',
      icon:'fa fa-tachometer',
      redirectTo:'/dashboard'
    },
    {
      title:'Rutas',
      icon:'fa fa-map-marker',
      options:[
        {
          title: 'Ver rutas',
          icon:'fa fa-eye',
          redirectTo:'routes'
        },
        {
          title:'Agregar ruta',
          icon:'fa fa-plus-circle',
          redirectTo:'routes/new'
        }
      ]
    },
    {
      title:'Vehículos',
      icon:'fa fa-motorcycle',
      options:[
        {
          title: 'Ver vehículos',
          icon:'fa fa-eye',
          redirectTo:'vehicles'
        },
        {
          title:'Agregar vehículo',
          icon:'fa fa-plus-circle',
          redirectTo:'vehicles/create'
        }
      ]
    },
    {
      title:'Clientes',
      icon:'fa fa-users',
      options:[
        {
          title: 'Ver clientes',
          icon:'fa fa-eye',
          redirectTo:'clients'
        },
        {
          title:'Agregar cliente',
          icon:'fa fa-plus-circle',
          redirectTo:'clients/create'
        }
      ]
    },
    {
      title:'Cobradores',
      icon:'fa fa-address-book-o',
      options:[
        {
          title: 'Ver cobradores',
          icon:'fa fa-eye',
          redirectTo:'employees'
        },
        {
          title:'Agregar cobrador',
          icon:'fa fa-plus-circle',
          redirectTo:'employees/create'
        }
      ]
    },
  ];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUser().then(user=>{
      this.user = user;
      $('body').addClass('hold-transition sidebar-mini layout-fixed ')
      $('body').Layout();
      $('[data-widget="pushmenu"]').PushMenu();
      $(document).ready(() => {
          $('[data-widget="treeview"]').Treeview('init');
      });
    })
  }


}
