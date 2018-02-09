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

  @Input('teams') teams: Team[];

  // @Input('teams') teams: Team[];

  constructor(
    private dbs: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  // this.assignTeamDetails();
  }

  ngOnInit() {
  this.dbs.assignTeamDetails();
  }



}
