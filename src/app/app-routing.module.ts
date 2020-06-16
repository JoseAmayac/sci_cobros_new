import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from './guards/auth-check.guard';
import { BeforeLoginGuard } from './guards/before-login.guard';
import { InitialPaymentComponent } from './pages/payment/initial-payment/initial-payment.component';
import { CheckStatePaymentGuard } from './guards/check-state-payment.guard';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=>import('./pages/auth/auth.module').then(m=>m.AuthModule),
    canLoad:[BeforeLoginGuard],
  },
  {
    path:'payment',
    loadChildren: ()=>import('./pages/payment/payment.module').then(m=>m.PaymentModule),
    canActivate:[AuthCheckGuard],
    data:{
      ruta:2
    }
  },
  {
    path:'dashboard',
    loadChildren: ()=>import('./pages/admin/admin.module').then(m=>m.AdminModule),
    canActivate:[AuthCheckGuard],
    data:{
      ruta:1
    }
  },
  {
    path:'employee',
    loadChildren: ()=>import('./pages/employee/employee.module').then(m => m.EmployeeModule),
    canActivate:[AuthCheckGuard],
    data:{
      ruta: 3
    }
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
