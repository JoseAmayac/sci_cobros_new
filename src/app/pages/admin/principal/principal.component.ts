import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';

import { User } from 'src/app/interfaces/interfaces'
import { SidebarService } from 'src/app/services/layouts/sidebar.service';

declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  user:User;

  error = null;

  //Esto lo debo sacar en un servicio personalizado
  opciones = [];

  constructor(private userService:UserService, private sidebarService:SidebarService) { }

  ngOnInit() {
    this.opciones = this.sidebarService.getAdminOptions()
    this.userService.getUser()
        .then(user=>{
          this.user = user;
          $('body').addClass('hold-transition sidebar-mini layout-fixed ')
          $('body').Layout();
          $('[data-widget="pushmenu"]').PushMenu();
          $(document).ready(() => {
              $('[data-widget="treeview"]').Treeview('init');
          });
        })
        .catch(err=>{
          this.error = err;
          console.log(this.error);
        })
  }


}
