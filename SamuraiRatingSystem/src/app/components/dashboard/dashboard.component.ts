import { DatabaseService } from './../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/Teams';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];

  constructor(private dbConn: DatabaseService) {
    dbConn.getTeams();
   }

  ngOnInit() {
    this.teams = this.dbConn.teams;
    console.log(this.teams + 'On dashboard now');
  }
}
