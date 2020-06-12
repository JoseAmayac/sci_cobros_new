import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GeneralInformation } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/admin/user.service';
import { catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  information:Observable<GeneralInformation>;

  error = null;

  constructor(private userService:UserService,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.information = this.userService.getInformation().pipe(
      tap(data=>{
        this.spinner.hide()
      }),
      catchError(err=>{
        this.spinner.hide()
        this.error = err
        return throwError(err)
      })
    )
  }

}
