import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { print } from 'util';
import { DatabaseService } from '../../service/database.service';
import { Team } from '../../model/Teams';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('teams') team;

  flipped: boolean;

  ngOnInit() {
    console.log(this.team, 'Here on card now');
  }


  flip() {
    this.flipped = !this.flipped;
  }

}



  