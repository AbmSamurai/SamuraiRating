import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../../model/Teams';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css','../registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {

  team:Team = new Team();
  profilePicture:ProfilePicture;
  profilePicUrl: any;
  uploadPercentage: number;
 
  constructor(public dbConn: DatabaseService, private router:Router) { 
  }



  ngOnInit() {
  }

  // createTeam(name: string, pictureURL: string, pin: string) {



  profileUpload(event: any) {
    this.dbConn.uploadProfilePicture(event, this.team.Name);
    this.filePreview(event);
  }


  filePreview(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePicUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

    
  submit(){

    var temp = this.dbConn.getDownloadUrl().subscribe(response =>{
      this.team.Picture = response as string;
      console.log(temp);
      this.dbConn.createTeam(this.team).then(response =>{
        this.router.navigate(['/dashboard']);
      })
    })
    
    
     
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
