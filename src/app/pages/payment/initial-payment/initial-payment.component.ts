import { Component, OnInit } from '@angular/core';

import { IPayPalConfig, ICreateOrderRequest  } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

const url = environment.url;
const clientId = environment.clientIDPaypal;

@Component({
  selector: 'app-initial-payment',
  templateUrl: './initial-payment.component.html',
  styleUrls: ['./initial-payment.component.css']
})
export class InitialPaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;


  constructor() { }

  ngOnInit() {
    this.initConfig()
  }

  private initConfig(): void {
    this.payPalConfig = {
      style:{
        // color:"blue",
        // label:"paypal",
        // shape:"pill",
        tagline:false,
        // size:"responsive",
        layout:"horizontal"
      },
      clientId: clientId,
      createOrderOnServer: (data) => fetch(`${url}/payments/paypal/create`)
          .then((res) => res.json())
          .then((order) => {
            return order.result.id
          }),
      authorizeOnServer: (approveData) => {
        return fetch(`${url}/payments/paypal/authorize/${approveData.orderID}`,)
        .then((res)=>{
          return res.json()
        }).then((details)=>{
          alert('Authorization created for ' + details.payer_given_name);
        })
        // return Promise.resolve(true);
      },
      onCancel: (data, actions) => {
          // console.log('OnCancel', data, actions);
          // this.showCancel = true;
      },
      onError: err => {
          // console.log('OnError', err);
          // this.showError = true;
      },
      onClick: (data, actions) => {
          // console.log('onClick', data, actions);
          // this.resetStatus();
      },
  };
  }

}
