import { Component, OnInit } from '@angular/core';

import { Route } from 'src/app/interfaces/interfaces';

import Swal from 'sweetalert2';

import { Observable, throwError } from 'rxjs';
import { RoutesService } from 'src/app/services/admin/routes.service';
import { catchError } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  //Lista de rutas a mostrar en la vista
  routes: Observable<Route[]>;

  //Posible error que puede ocurrir al consultar las rutas
  error = null;

  //Opciones de la tabla
  dtOptions: DataTables.Settings = {};

  //Determina la fila en la que se está realizando hover 
  row = -1;
  constructor(private routeService:RoutesService, private uiService:UiService) { }


  ngOnInit() {
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      },
      responsive:true,
      info:true,
      autoWidth:false,
    };

    this.index()
    
  }

  index(){
    this.routes = this.routeService.index().pipe(
      catchError(err=>{
        this.error = err;
        return throwError(err)
      })
    );
  }

  destroy(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8F9FA',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="color:gray">Sí, eliminar ruta<span>',
      cancelButtonText:'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if(result.value) 
      {
        this.routeService.destroy(id).subscribe(
          data => this.handleResponseDeleted(data),
          error => this.handleErrorDelete(error)
        )
      }
    })
  }

  handleResponseDeleted(data){
    this.uiService.showInfoMessage(data.message,'Ruta borrada!');
    this.index();
  }

  handleErrorDelete(error){
    this.uiService.showErrorMessage('Algo no está funcionando bien en nuestro servidor');
  }
}
