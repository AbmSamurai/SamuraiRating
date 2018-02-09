import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../../model/Teams';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css','../registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {

  team:Team = new Team();
  profilePicture:ProfilePicture;
  profilePicUrl: any;
  constructor(private dbConn: DatabaseService) { }

  ngOnInit() {
    
    
  }

  // createTeam(name: string, pictureURL: string, pin: string) {

  submit(){
    this.dbConn.createTeam(this.team);
  }

  profileUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.profilePicture = new ProfilePicture(file);
      this.filePreview(event);
    }

  }


  filePreview(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePicUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}

export class ProfilePicture{
  file:File;
  url: string;
  teamName: String;

  constructor(file:File){
    this.file= file;
  }

  
}
