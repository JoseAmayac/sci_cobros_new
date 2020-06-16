import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/interfaces';
import { ClientService } from 'src/app/services/admin/client.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {

  client:Observable<User>;
  error = null;

  constructor(private route:ActivatedRoute, private clientService:ClientService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.client = this.clientService.show(id).pipe(
      tap(client=>{
        console.log(client);
        
      }), 
      catchError(err=>{
        this.error = err;
        return throwError(err)
      })
    )
  }

}
