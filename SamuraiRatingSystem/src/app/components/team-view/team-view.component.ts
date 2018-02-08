import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../service/database.service';
import { Team } from '../../model/Teams';
import { Router, ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'team-view',
  templateUrl: './team-view.component.html',
  styleUrls: [
    './team-view.component.css',
    '../../../assets/styles/mainstyle.css'
  ]
})
export class TeamViewComponent implements OnInit {
  allTeams;
  givenTeamKey;
  @Input('teams') teams: Team[];

  // @Input('teams') teams: Team[];

  constructor(
    private dbs: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  this.assignTeamDetails();
  }

assignTeamDetails() {
this.givenTeamKey = this.route.queryParams.subscribe(params => {
  this.givenTeamKey = params['team'];
});
this.allTeams = this.dbs.getAllTeams();
// tslint:disable-next-line:no-shadowed-variable
this.allTeams.forEach(element => {
  for (let i = 0; i < element.length; i++) {
    if (element[i].key === this.givenTeamKey) {
      this.givenTeamKey = element[i];
    }
  }
});
}

}
