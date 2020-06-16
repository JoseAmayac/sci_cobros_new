import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private adminOptions = [
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

  private employeeOptions = [
    {
      title:'Dashboard',
      icon:'fa fa-tachometer',
      redirectTo:'dashboard'
    },
    {
      title:'Mi ruta',
      icon:'fa fa-map-marker',
      redirectTo:'route'
    },
    {
      title:'Clientes',
      icon:'fa fa-users',
      redirectTo:'clients'
    }
  ];

  constructor() { }

  getAdminOptions(){
    return this.adminOptions;
  }

  getEmployeeOptions(){
    return this.employeeOptions;
  }
}
