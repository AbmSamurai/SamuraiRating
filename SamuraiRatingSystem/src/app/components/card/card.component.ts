import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { print } from 'util';
import { DatabaseService } from '../../service/database.service';
import { Team } from '../../model/Teams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  flipped: boolean;
  @Input('teams') teams: Team[];

  constructor(
    private dbs: DatabaseService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log(this.teams + 'Here on card now');
    // console.log('demo teams as follows ' + this.demoTeams);
  }


  flip() {
    this.flipped = !this.flipped;
  }

  sendTeam( teamKey) {
    this.router.navigate(['/teamView'], { queryParams: { team:  teamKey } });
  }
}
