import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { EmployeeService } from 'src/app/services/admin/employee.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  //Paso en el que va el formulario
  step:number = 0;

  //Título a mostrar segun el paso
  stepTitle:string = "Información basica";

  
  //Usuario que va a ser creado 
  employee:User = {};

  //Variable que determina si el formulario está siendo enviado al backend,
  // esto deshabilita el botón de enviar el formulario
  enviando:boolean = false;

  //Errores que pueden suceder en la creación del usuario
  error:User = {};

  constructor(private service:EmployeeService,
              private uiService:UiService,
              private router:Router) { }

  ngOnInit() {
  }

  siguiente(){
    this.step++;
  }

  create(){
    this.enviando = true;
    $('button#btnCrearCobrador').text('Creado cobrador...')
    this.service.create(this.employee).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.enviando = false;
    $('button#btnCrearCobrador').text('Crear cobrador')
    this.uiService.showCorrectMessage(data.message,'Cobrador creado');
    this.router.navigateByUrl('/dashboard/employees');
  }

  handleError(error){
    this.enviando = false;
    $('button#btnCrearCobrador').text('Crear cobrador')
    if (error.status === 422) {
      this.error = error.error.errors;
      if (this.error.dni || this.error.cellphone) {
        this.step = 0;
      } else {
        this.step = 1;
      }
      this.uiService.showWarningMessage('Comprueba la información que has ingresado')
    }else{
      this.uiService.showErrorMessage('Algo no está funcionando correctamente en nuestro servidor');
    }
  }
} 
