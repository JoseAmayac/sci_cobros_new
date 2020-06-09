import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { ClientService } from 'src/app/services/admin/client.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients:Observable<User[]>;

  error = null;

  constructor(private service:ClientService) { }

  ngOnInit() {
    this.clients = this.service.index().pipe(
      catchError(err=>{
        this.error = err;
        return throwError(err)
      })
    )
  }

}
