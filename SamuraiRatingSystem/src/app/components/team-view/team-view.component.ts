import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css', '../../../assets/styles/mainstyle.css']
})
export class TeamViewComponent implements OnInit {
   teams: any = this.dbs.getTeams();
  constructor(private dbs: DatabaseService) {
    // console.log('' + this.dbs.getTeams());
   }

  ngOnInit() {
    // console.log('' + this.dbs.getTeams());
    // console.log('teamlist ' + this.dbs.teamList.key);
      }

}
