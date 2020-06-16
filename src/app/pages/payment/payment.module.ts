import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPaymentComponent } from './initial-payment/initial-payment.component';

import { PaymentRoutingModule } from './payment-routing.module'

import { NgxPayPalModule } from 'ngx-paypal';

import { NgxSpinnerModule } from 'ngx-spinner'

@NgModule({
  declarations: [
    InitialPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgxPayPalModule,
    NgxSpinnerModule
  ]
})
export class PaymentModule { }
