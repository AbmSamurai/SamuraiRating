import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { print } from 'util';
import { DatabaseService } from '../../service/database.service';
import { Team } from '../../model/Teams';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
demoTeams = this.dbs.teams;
  flipped: boolean;
  @Input('teams') teams: Team[];

  constructor(private dbs: DatabaseService) {
    // this.demoTeams = this.dbs.getTeams();
    console.log('demo teams as follows ' + this.demoTeams);

  }

  ngOnInit() {
    console.log(this.teams + 'Here on card now');
  }


  flip() {
    this.flipped = !this.flipped;
  }
}
