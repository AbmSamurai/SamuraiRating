import { Component } from '@angular/core';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private dbConn: DatabaseService){

  }

  login(){
    console.log('reaching')
    this.dbConn.googlePopup();
  }
}
