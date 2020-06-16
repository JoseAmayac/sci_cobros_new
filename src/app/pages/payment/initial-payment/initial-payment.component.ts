import { Component, OnInit } from '@angular/core';

import { IPayPalConfig, ICreateOrderRequest  } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UiService } from 'src/app/services/ui/ui.service';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { async } from '@angular/core/testing';

const url = environment.url;
const clientId = environment.clientIDPaypal;

@Component({
  selector: 'app-initial-payment',
  templateUrl: './initial-payment.component.html',
  styleUrls: ['./initial-payment.component.css']
})
export class InitialPaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  usuario:User = {};
  username:string = "";


  constructor(
    private router:Router,
    private spinner:NgxSpinnerService,
    private uiService:UiService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.usuario = this.authService.getUserLocal()
    this.username = this.usuario.name + " " + this.usuario.lastname
    this.initConfig()
  }

  logout(){
    this.authService.logout().subscribe()
  }

  private async initConfig() {
    let token = await localStorage.getItem('token');
    this.payPalConfig = {
      style:{
        label:"pay",
        tagline:false,
        layout:"horizontal"
      },
      clientId: clientId,
      createOrderOnServer: (data) => {
        
        return fetch(`${url}/payments/paypal/create`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((order) => {
            return order.result.id
          })  
      },
      authorizeOnServer: (approveData) => {
        this.spinner.show()
        return fetch(`${url}/payments/paypal/authorize/${approveData.orderID}`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res)=>{
          return res.json()
        }).then(async(details)=>{
          this.spinner.hide()
          this.authService.usuario = details.user
          this.router.navigateByUrl('/dashboard');
        })
      },
      onCancel: (data, actions) => {
          // console.log('OnCancel', data, actions);
          // this.showCancel = true;
      },
      onError: err => {
        this.uiService.showErrorMessage('Algo no está funcionando correctamente')
      },
      onClick: (data, actions) => {
          // console.log('onClick', data, actions);
          // this.resetStatus();
      },
  };
  }

}
