import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor( protected dbauth: DatabaseService, protected router: Router ) {
    this.dbauth.disableNav = true;
   }

  ngOnInit() {
    
  }


  login() {
    this.dbauth.googlePopup();
  }
}
