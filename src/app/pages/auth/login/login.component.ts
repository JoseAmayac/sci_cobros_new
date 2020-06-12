import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password:null
  }

  public error = null;

  constructor(private title:Title, 
              private spinner:NgxSpinnerService,
              private service:AuthService,
              private token:TokenService,
              private router:Router
              ) { }

  ngOnInit() {
    this.spinner.hide()
    this.title.setTitle('Iniciar sesión');
  }

  addClassEmail()
  {
    if($('#email').val().trim() != "") {
      $('#email').addClass('has-val');
      $('#email').addClass('trans');
    }
    else {
        $('#email').removeClass('has-val');
    }
  }

  addClassPassword()
  {
    if($('#password').val().trim() != "") {
      $('#password').addClass('has-val');
    }
    else {
        $('#password').removeClass('has-val');
    }
  }

  login(){
    this.spinner.show();
    this.service.login(this.form).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.spinner.hide();
    this.token.createToken(data.access_token);

    if (data.user.role.name === 'admin') {
      this.router.navigateByUrl('/payment')
    } else {
      this.router.navigateByUrl('/employee')
    }
  }

  handleError(error){
    this.spinner.hide();
    this.error = error.error.error;
  }

}
