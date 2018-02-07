import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team} from './../../../model/Teams'

@Component({
  selector: 'app-person-registration',
  templateUrl: './person-registration.component.html',
  styleUrls: ['./person-registration.component.css','../registration.component.css']
})
export class PersonRegistrationComponent implements OnInit {
  teams: Team[] = [];

  constructor(private dbConn: DatabaseService) { }

  ngOnInit() {
    console.log(this.dbConn.teams + "Teams at the right place");
    this.teams = this.dbConn.teams;
  }

  setKey(key){
    this.dbConn.setTeamKey(key);
    console.log(this.dbConn.getTeamKey() + "team key")
  }

}
