import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: []
})
export class UserCardComponent implements OnInit {

  @Input() usuario:User = null;

  constructor() { }

  ngOnInit() {
  }

}
