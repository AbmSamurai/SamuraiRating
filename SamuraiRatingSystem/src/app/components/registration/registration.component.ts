import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerPart: number = 0;

  constructor() { }

  ngOnInit() {
  }


  setStep(step: number){
    this.registerPart = step;
  }
  
}
