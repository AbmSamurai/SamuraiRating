import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css','../registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {

  profilePicUrl: any;
  profilePicture:ProfilePicture;

  constructor() { }

  ngOnInit() {
  }


  profileUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.profilePicture = new ProfilePicture(file);
      this.filePreview(event, 'profile-pic');
    }

  }


  filePreview(event: any, fileType: string) {
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
