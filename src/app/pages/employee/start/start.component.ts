import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/admin/user.service';

declare var $:any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styles: []
})
export class StartComponent implements OnInit {
  user:User = null;

  constructor(private userService:UserService) { }

  //Esto lo debo sacar en un servicio personalizado
  opciones = [
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
