import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialPaymentComponent } from './initial-payment/initial-payment.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:InitialPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
