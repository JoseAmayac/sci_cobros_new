import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';

import { RoutesService } from 'src/app/services/admin/routes.service';
import { UiService } from 'src/app/services/ui/ui.service';

declare var $:any;

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  //Ruta que se va a agregar o a editar
  route:Route = {}

  //Para saber si la ruta se va a editar o es nueva, esto se sabe con los parametros de la url
  aEditar:boolean = false;

  //Para deshabilitar el botón cuando los datos están siendo enviados al servidor
  enviando:boolean = false;

  //Errores que pueden suceder cuando se envia el formulario 
  error:Route = {
    name:null,
    ammount:null
  };

  constructor(private service:RoutesService,
              private router:Router,
              private uiService:UiService,
              private routeA:ActivatedRoute) { }

  ngOnInit() {
    let id = this.routeA.snapshot.paramMap.get('id')

    if (id) {
      this.aEditar = true;

      this.service.edit(id).subscribe(
       res=>{
        this.handleResponseEdit(res)
       },
       error=>{
        this.handleErrorEdit(error)
       }
      )

    }

  }

  createRoute(){
    this.enviando = true;
    $('button#btnEnviar').text('Enviando datos...')
    this.service.create(this.route).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.enviando = false;
    $('button#btnEnviar').text('Enviar')
    this.router.navigateByUrl('/dashboard/routes');
    this.uiService.showCorrectMessage(data.message,'Hecho!');
  }

  handleError(error){
    this.enviando = false;
    $('button#btnEnviar').text('Enviar')

    if (error.status === 422) {
      this.error = error.error.errors;
      this.uiService.showWarningMessage('Tenemos problemas con la información que brindaste');
      setTimeout(() => {
        $(".alert-danger").fadeTo(4000, 500).slideUp(500)
      }, 1500);
    }else{
      this.uiService.showErrorMessage('Algo no está funcionando bien en nuestro servidor');
    }
  }

  handleResponseEdit(data){
    this.route = data.route;
  }

  handleErrorEdit(error){
    if (error.status === 404) {
      this.uiService.showWarningMessage('No existe un ruta creada con ese identificador');
      this.router.navigateByUrl('/dashboard/routes');
    }
    
  }

  update(){
    this.enviando = true;
    $('button#btnEnviar').text('Enviando datos...')
    let id = this.route.id;
    this.service.update(Number(id),this.route).subscribe(
      res=>this.handleResponseUpdate(res),
      err=>this.handleErrorUpdate(err)
    )
  }

  handleResponseUpdate(data){
    this.enviando = false;
    $('button#btnEnviar').text('Enviar')
    this.uiService.showCorrectMessage(data.message,'Ruta actualizada');
    this.router.navigateByUrl('/dashboard/routes');
  }

  handleErrorUpdate(error){
    this.enviando = false;
    $('button#btnEnviar').text('Enviar')
    this.uiService.showErrorMessage('Algo no está funcionando bien en nuestro servidor')
  }

}
