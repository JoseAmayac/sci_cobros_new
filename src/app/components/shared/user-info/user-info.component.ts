import { Component, OnInit, Input } from '@angular/core';

import { User } from 'src/app/interfaces/interfaces';

declare var $:any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  @Input() user:User = {};

  habilitados:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  habilitarCampos(){
    if (!this.habilitados) {
      $('input.form-control.edit').attr('disabled',false);
      $('input.form-control.edit').first().focus()
    }else{
      $('input.form-control').attr('disabled',true);
    }

    this.habilitados = !this.habilitados;
  }
}
