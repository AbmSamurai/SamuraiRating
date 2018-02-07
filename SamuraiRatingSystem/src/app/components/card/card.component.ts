import { Component, OnInit } from '@angular/core';
import { print } from 'util';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
demoTeams = this.dbs.teams;
  flipped: boolean;

  constructor(private dbs: DatabaseService) {
    // this.demoTeams = this.dbs.getTeams();
    console.log('demo teams as follows ' + this.demoTeams);

  }

  ngOnInit() {
  }


  flip() {
    this.flipped = !this.flipped;
  }
}
