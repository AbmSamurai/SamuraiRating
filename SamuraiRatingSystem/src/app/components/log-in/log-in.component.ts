import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor( private dbauth: DatabaseService ) { }

  ngOnInit() {
  }


  login() {
this.dbauth.googlePopup();
  }

}
