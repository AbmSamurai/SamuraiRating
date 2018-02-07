import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/Teams';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input('teams') teams: Team[];

  flipped:boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.teams + "Here on card now")
  }


  flip(){
    this.flipped = !this.flipped;
  }
}
