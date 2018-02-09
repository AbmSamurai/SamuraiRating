import { DatabaseService } from './../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/Teams';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teams: Observable<Team[]>;

  constructor(private dbConn: DatabaseService) {
    dbConn.getTeams();
   }

  ngOnInit() {
    this.teams = this.dbConn.getTeams().map(response =>  response as Team[]);
  }
}
