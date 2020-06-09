import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from './guards/auth-check.guard';


const routes: Routes = [
  {
    path:'',
    loadChildren: ()=>import('./pages/auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'dashboard',
    loadChildren: ()=>import('./pages/admin/admin.module').then(m=>m.AdminModule),
    canLoad:[AuthCheckGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
