import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPaymentComponent } from './initial-payment/initial-payment.component';

import { PaymentRoutingModule } from './payment-routing.module'

import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    InitialPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgxPayPalModule
  ]
})
export class PaymentModule { }
