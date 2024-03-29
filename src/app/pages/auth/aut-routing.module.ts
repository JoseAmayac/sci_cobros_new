import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
      path:'register',
      component:RegisterComponent
  },
  {
    path:'password',
    children:[
      {
        path:'reset',
        component:ForgotPasswordComponent
      },
      {
        path:'recover',
        component:ResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
