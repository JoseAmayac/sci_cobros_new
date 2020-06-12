import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() usuario:User = {}
  username:string = "";

  constructor(private service:AuthService,
              private router:Router,
              private token:TokenService
              ) { }

  ngOnInit() {
    this.username = this.usuario.name +" "+ this.usuario.lastname;
  }

  logout(){
    this.service.logout().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  async handleResponse(data){
    this.service.usuario = null;
    await this.token.clearStorage()
    this.router.navigateByUrl('/auth/login');
  }

  async handleError(error){
    this.service.logoutAlternative(false);
    this.router.navigateByUrl('/auth/login');
  }
}
