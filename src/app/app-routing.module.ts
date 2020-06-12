import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from './guards/auth-check.guard';
import { BeforeLoginGuard } from './guards/before-login.guard';
import { InitialPaymentComponent } from './pages/payment/initial-payment/initial-payment.component';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=>import('./pages/auth/auth.module').then(m=>m.AuthModule),
    canLoad:[BeforeLoginGuard],
  },
  {
    path:'payment',
    loadChildren: ()=>import('./pages/payment/payment.module').then(m=>m.PaymentModule),
    canLoad:[AuthCheckGuard]
  },
  {
    path:'dashboard',
    loadChildren: ()=>import('./pages/admin/admin.module').then(m=>m.AdminModule),
    canLoad:[AuthCheckGuard],
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
