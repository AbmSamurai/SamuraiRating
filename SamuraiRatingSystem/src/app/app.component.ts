import { Question } from './model/Criteria';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  name;
  picURL;
  pin;

  constructor(private dbConn: DatabaseService){

  }


  ngOnInit(){

  }

  // login(){
  //   console.log('reaching')
  //   console.log(this.dbConn.teams + "Another attempt");
  //   console.log(this.dbConn.getCriteria() + "Crying is not a habit")
  //   this.dbConn.googlePopup();

  // }

  // createTeam() {
  //   this.dbConn.createTeam(this.name, this.picURL, this.pin);

  // }
}
