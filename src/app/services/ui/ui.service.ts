import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toast:ToastrService) { }

  showCorrectMessage(message:string,title:string){
    this.toast.success(message,title);
  }

  showErrorMessage(message:string){
    this.toast.error(message,'Algo salió mal',{
      timeOut:6000
    })
  }

  showWarningMessage(message:string){
    this.toast.warning(message,'Algo salió mal',{
      timeOut:6000
    })
  }

  showInfoMessage(message:string,title:string){
    this.toast.info(message,title);
  }
}
