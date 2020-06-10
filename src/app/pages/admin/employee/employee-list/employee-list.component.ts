import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/admin/employee.service';
import { User } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:Observable<User[]>;

  error = null;

  constructor(private service:EmployeeService,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.employees = this.service.index().pipe(
      tap(data=>{
        this.spinner.hide()
      }) ,
      catchError(err=>{
        this.spinner.hide()
        this.error = err
        return throwError(err)
      })
    )
  }

}
