// import { Observable } from '@firebase/util/dist/esm/src/subscribe';
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
  
  teams: Observable<Team[]>;
  teamName:string;
  member: Member = new Member();

  constructor(protected dbConn: DatabaseService) {
    this.teams = this.dbConn.getTeams().map(response =>  response as Team[]);
   }


  submit(){
   var subscription = this.dbConn.getUser(this.dbConn.getCurrentUserID()).valueChanges().subscribe(response =>{
     this.member = response as Member;
     console.log(response);  
     this.dbConn.setTeam(this.member,this.teamName);
     subscription.unsubscribe();
   });
    
  }

  setSelection(teamName:string){
    this.teamName = teamName;
  }
}
