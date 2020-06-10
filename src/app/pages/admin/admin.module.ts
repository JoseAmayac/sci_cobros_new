import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms'

import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner'



import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddRouteComponent } from './routes/add-route/add-route.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { VehiclesFormComponent } from './vehicles/vehicles-form/vehicles-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PrincipalComponent,
    AddRouteComponent,
    RouteListComponent,
    ClientsListComponent,
    ClientsFormComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    VehiclesListComponent,
    VehiclesFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    FormsModule,
    DataTablesModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
