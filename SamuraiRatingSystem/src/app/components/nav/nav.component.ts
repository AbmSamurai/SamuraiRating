import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  selected:boolean;

  constructor() { }

  ngOnInit() {
  }

  switch() {
    this.selected = !this.selected;
    console.log(this.selected);
  }

}
