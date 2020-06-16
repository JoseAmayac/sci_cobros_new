import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/admin/user.service';
import { SidebarService } from 'src/app/services/layouts/sidebar.service';

declare var $:any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styles: []
})
export class StartComponent implements OnInit {
  user:User = null;

  constructor(private userService:UserService, private sidebarService:SidebarService) { }

  //Esto lo debo sacar en un servicio personalizado
  opciones = [];

  ngOnInit() {
    this.opciones = this.sidebarService.getEmployeeOptions()
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
