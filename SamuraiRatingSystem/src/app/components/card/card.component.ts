import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { print } from 'util';
import { DatabaseService } from '../../service/database.service';
import { Team } from '../../model/Teams';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('teams') team;

  flipped: boolean;
constructor(
  private dbs: DatabaseService,
  private router: Router,
  // private route: Routes,
) {}

  ngOnInit() {
    console.log(this.team, 'Here on card now');
  }


  flip() {
    this.flipped = !this.flipped;
  }

  StartReview(teamName:string){



sendTeam(specifiedTeam) {
  console.log('clicked on this team:', specifiedTeam.Name);
  this.dbs.SneakedTeam = specifiedTeam;
  this.router.navigate(['teamView']);
  }

}
