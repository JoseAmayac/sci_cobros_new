import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() usuario:User = {}
  username:string = "";

  constructor(private service:AuthService,private router:Router) { }

  ngOnInit() {
    this.username = this.usuario.name +" "+ this.usuario.lastname;
  }

  logout(){
    this.service.logout().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.router.navigateByUrl('/login');
  }

  handleError(error){
    this.router.navigateByUrl('/login');
  }
}
