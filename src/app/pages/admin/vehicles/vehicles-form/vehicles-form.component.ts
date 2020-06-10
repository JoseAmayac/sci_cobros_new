import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/interfaces';
import { VehiclesService } from 'src/app/services/admin/vehicles.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent implements OnInit {

  vehicle:Vehicle = {};

  error:Vehicle = {};

  enviando:boolean = false;

  aEditar:boolean = false;

  constructor(private service:VehiclesService,
              private uiService:UiService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.aEditar = true;
      this.getInformation(id)
    }
  }

  getInformation(id){
    this.service.edit(id).subscribe(
      res=>this.handleResponseEdit(res),
      err=>this.handleErrorEdit(err)
    )
  }

  handleResponseEdit(data){
    this.vehicle = data.vehicle;
  }

  handleErrorEdit(error){

  }

  update(){
    this.enviando = true;
    $('button#btnEnviar').text('Enviando datos....')
    this.service.update(this.vehicle.id,this.vehicle).subscribe(
      res=>this.handleResponseUpdate(res),
      error=>this.handleErrorUpdate(error)
    )
  }

  handleResponseUpdate(data){
    this.enviando = false;
    $('button#btnEnviar').text('Actualizar información')
    this.uiService.showCorrectMessage(data.message,'Información actualizada');
    this.router.navigateByUrl('/dashboard/vehicles')
  }

  handleErrorUpdate(error){
    this.enviando = false;
    $('button#btnEnviar').text('Actualizar información')
    this.uiService.showErrorMessage('Algo no está funcionando correctamente en nuestro servidor')
  }

  create(){
    this.enviando = true;
    $('button#btnEnviar').text('Enviando datos....')
    this.service.create(this.vehicle).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.enviando = false;
    $('button#btnEnviar').text('Crear vehículo')
    this.uiService.showCorrectMessage(data.message,'Vehículo creado');
    this.router.navigateByUrl('/dashboard/vehicles');
  }

  handleError(error){
    this.enviando = false;
    $('button#btnEnviar').text('Crear vehículo')
    if (error.status === 422) {
      this.uiService.showWarningMessage('Revisa los datos que estas ingresando');
      this.error = error.error.errors;

      setTimeout(() => {
        $(".alert-danger").fadeTo(4000, 500).slideUp(500)
      }, 1500);

    } else {
      this.uiService.showErrorMessage('Algo no está funcionando correctamente en nuestro servidor');
    }
  }

}
