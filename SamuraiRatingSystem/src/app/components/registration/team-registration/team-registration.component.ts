import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../../model/Teams';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css','../registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {

  team:Team = new Team();
  profilePicture:ProfilePicture;
  profilePicUrl: any;
  uploadPercentage: Observable<number> = this.dbConn.getUploadPercentage();
  constructor(public dbConn: DatabaseService) { 
  }



  ngOnInit() {
    
    
  }

  // createTeam(name: string, pictureURL: string, pin: string) {



  profileUpload(event: any) {
    this.dbConn.uploadProfilePicture(event, this.team.Name);

  }


  filePreview(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePicUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

    
  submit(){
    this.uploadFile();
    this.dbConn.createTeam(this.team);
  }

  uploadFile(){
    
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
