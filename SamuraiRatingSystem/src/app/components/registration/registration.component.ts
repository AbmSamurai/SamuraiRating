import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerPart: number = 0;

  constructor(private db: DatabaseService) {
   }

  ngOnInit() {
  }


  setStep(step: number){
    this.registerPart = step;
    console.log(this.registerPart);
  }
  
}
