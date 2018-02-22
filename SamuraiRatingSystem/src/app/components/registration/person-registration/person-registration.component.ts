import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team} from './../../../model/Teams';
import { Observable } from "rxjs/Rx";
import { Member } from '../../../model/Member';


@Component({
  selector: 'app-person-registration',
  templateUrl: './person-registration.component.html',
  styleUrls: ['./person-registration.component.css','../registration.component.css']
})
export class PersonRegistrationComponent  {
  
  teams: Array<Team> = new Array<Team>();
  teamName:string;
  member: Member = new Member();
  currentMember: Member;

  constructor(protected dbConn: DatabaseService) {

   
    var subscription = this.dbConn.getUser(this.dbConn.getCurrentUserID()).valueChanges().subscribe(response =>{
      this.member = response as Member;
      this.dbConn.getTeams().subscribe(response =>{
        
        this.teams = response as Team[];
        this.teams = this.teams.filter((team) => team.Name  != this.member.team)
        
      })
    });

   
   }


  submit(){
    this.dbConn.hasBeenRemoved = false;
    this.dbConn.setTeam(this.member,this.teamName);
  }

  setSelection(teamName:string){
    this.teamName = teamName;
  }
}
