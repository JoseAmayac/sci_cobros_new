import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms'

import { DataTablesModule } from 'angular-datatables';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddRouteComponent } from './routes/add-route/add-route.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PrincipalComponent,
    AddRouteComponent,
    RouteListComponent,
    ClientsListComponent,
    ClientsFormComponent,
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class AdminModule { }
