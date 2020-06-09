import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() usuario:User = {}
  @Input() opciones;

  username:string = ""; 

  constructor() { }

  ngOnInit() {
    this.username = `${this.usuario.name} ${this.usuario.lastname}`

    this.verifyClass();

    $(document).ready(()=>{
      Array.from($('.nav-link')).forEach(enlace=>{
        $(enlace).click(()=>{
          this.verifyClass()
        })
      })
    })
  }

  verifyClass(){
    Array.from($('a.link_arriba')).forEach(link => {
      let nietos = $(link).siblings().children().children()
      setTimeout(() => {
        if ($(nietos).hasClass('active')) {
          $(link).addClass('active')
        }else{
          $(link).removeClass('active')
        }
      }, 200);
    });
  }
}
