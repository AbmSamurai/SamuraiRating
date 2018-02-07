import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  selected:boolean;

  constructor(private dbConn: DatabaseService) { }

  ngOnInit() {
  }

  switch() {
    this.selected = !this.selected;
    console.log(this.selected);
  }

  logout(){
    this.dbConn.logout();
  }

}
