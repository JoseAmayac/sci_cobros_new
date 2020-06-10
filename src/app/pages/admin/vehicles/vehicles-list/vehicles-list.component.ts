import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { VehiclesService } from 'src/app/services/admin/vehicles.service';
import { catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UiService } from 'src/app/services/ui/ui.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  //Lista de vehículos que van a ser mostrados en la tabla
  vehicles:Observable<Vehicle[]>;

  //Errores que pueden ocurrir al cargar la lista de vehículos
  error = null;

  //Opciones de la tabla
  dtOptions: DataTables.Settings = {};

  //Identificador de la fila en la que se hace hover en la tabla
  row = -1;


  constructor(private service:VehiclesService,
              private spinner:NgxSpinnerService,
              private uiService:UiService) { }

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
    this.spinner.show()
    this.vehicles = this.service.index().pipe(
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

  destroy(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8F9FA',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="color:gray">Sí, eliminar vehículo<span>',
      cancelButtonText:'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if(result.value) 
      {
        this.service.destroy(id).subscribe(
          data => this.handleResponseDeleted(data),
          error => this.handleErrorDeleted(error)
        )
      }
    })
  }

  handleResponseDeleted(data){
    this.uiService.showInfoMessage(data.message,'Vehículo eliminado');
    this.index()
  }

  handleErrorDeleted(error){
    this.uiService.showErrorMessage('Algo no está funcionando correctamente en nuestro servidor');
  }

}
