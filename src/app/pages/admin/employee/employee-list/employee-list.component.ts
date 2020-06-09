import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/admin/employee.service';
import { User } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:Observable<User[]>;

  error = null;

  constructor(private service:EmployeeService) { }

  ngOnInit() {
    this.employees = this.service.index().pipe(
      catchError(err=>{
        this.error = err
        return throwError(err)
      })
    )
  }

}
