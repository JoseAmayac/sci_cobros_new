import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { AddRouteComponent } from './routes/add-route/add-route.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';


const routes: Routes = [
  {
    path:'',
    component:PrincipalComponent,
    children:[
        {
            path:'',
            component:DashboardComponent
        },
        {
          path:'routes',
          children:[
            {
              path:'',
              component:RouteListComponent
            },
            {
              path:'new',
              component:AddRouteComponent
            },
            {
              path:'edit/:id',
              component:AddRouteComponent
            }
          ]
        },
        {
          path:'clients',
          children:[
            {
              path:'',
              component:ClientsListComponent
            },
            {
              path:'create',
              component:ClientsFormComponent
            },
            {
              path:'edit/:id',
              component:ClientsFormComponent
            },
            {
              path:'/:id',
            }
          ]
        },
        {
          path:'employees',
          children:[
            {
              path:'',
              component:EmployeeListComponent
            },
            {
              path:'create',
              component:EmployeeFormComponent
            }
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
