import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GeneralInformation } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/admin/user.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  information:Observable<GeneralInformation>;

  error = null;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.information = this.userService.getInformation().pipe(
      catchError(err=>{
        this.error = err
        return throwError(err)
      })
    )
  }

}
