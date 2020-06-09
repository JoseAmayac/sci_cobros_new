import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  @Input() usuarios:User[] = [];

  constructor() { }

  ngOnInit() {
  }

}
