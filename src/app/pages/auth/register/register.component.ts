import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {};

  error:User = {};

  constructor(private service:AuthService,
              private token:TokenService,
              private spinner:NgxSpinnerService,
              private router:Router,
              private title:Title
              ) { }

  ngOnInit() {
    this.title.setTitle('Registrarse')
  }

  addClass()
  {
    let inputs = $('.input100');
    for (let i = 0; i < inputs.length; i++) {
      if($(inputs[i]).val().trim() != ""){
        $(inputs[i]).addClass('has-val')
        $(inputs[i]).addClass('trans')
      }else{
        $(inputs[i]).removeClass('has-val');

      }
    }
  }

  register()
  {
    this.spinner.show()
    this.service.signUp(this.user).subscribe(
      res=>this.handleResponse(res),
      error=>this.handleError(error)
    )
  }

  handleResponse(data){
    this.spinner.hide()
    this.token.createToken(data.access_token);
    this.router.navigateByUrl('/dashboard');
  }

  handleError(error){
    this.spinner.hide()
    if(error.status == 422){
      this.error = error.error.errors
      window.setTimeout(function(){
        $(".alert-danger").fadeTo(4000, 500).slideUp(500)
      },1000)
    }else{
      console.log(error);
    }
  }
}
