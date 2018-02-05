import { Component } from '@angular/core';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name;
  picURL;
  pin;

  constructor(private dbConn: DatabaseService){

  }

  login(){
    console.log('reaching')
    this.dbConn.googlePopup();
  }

  createTeam(){
    this.dbConn.createTeam(this.name, this.picURL, this.pin)
    
  }
}
