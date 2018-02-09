import { Team } from './../../model/Teams';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  @Input('teams') teams: Team[];
  
  //  teams: any = this.dbs.getTeams();
  constructor(private dbs: DatabaseService) {
    // console.log('' + this.dbs.getTeams());
   }

  ngOnInit() {
    // console.log('' + this.dbs.getTeams());
    // console.log('teamlist ' + this.dbs.teamList.key);
      }

}
