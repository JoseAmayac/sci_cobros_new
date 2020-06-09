import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserCardComponent } from './shared/user-card/user-card.component'

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    UserListComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
    UserListComponent
  ]
})
export class ComponentsModule { }
