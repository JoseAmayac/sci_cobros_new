import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/admin/client.service';
import { UiService } from 'src/app/services/ui/ui.service';

declare var $:any;

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})

export class ClientsFormComponent implements OnInit {

  client:User = {};
  aEditar:boolean = false;

  enviando:boolean = false;

  error:User = {};

  constructor(private route:ActivatedRoute,
              private router:Router,
              private service:ClientService,
              private uiService:UiService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.aEditar = true;
    }
  }

  create(){
    this.enviando = true;
    $('button#btnEnviar').text('Enviando datos...')
    this.service.create(this.client).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.enviando = false;
    $('button#btnEnviar').text('Crear cliente')

    this.uiService.showCorrectMessage(data.message,'Cliente creado');
    this.router.navigateByUrl('/dashboard/clients');
  }

  handleError(error){
    this.enviando = false;
    $('button#btnEnviar').text('Crear cliente')

    if (error.status === 422) {
      this.error = error.error.errors;
      this.uiService.showWarningMessage('Verifica la información que has ingresado')
    }else{
      this.uiService.showErrorMessage('Algo no está funcionando correctamente en nuestro servidor');
    }

    setTimeout(() => {
      $(".alert-danger").fadeTo(4000, 500).slideUp(500)
    }, 1500);
  }

  update(){
    $('button#btnEnviar').text('Enviando datos...')
  }

}
