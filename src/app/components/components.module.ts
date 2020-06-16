import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserCardComponent } from './shared/user-card/user-card.component'
import { PipesModule } from '../pipes/pipes.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';   

import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    UserListComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
    UserListComponent
  ]
})
export class ComponentsModule { }
