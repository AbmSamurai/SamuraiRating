import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/Teams';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input('teams') team;

  flipped:boolean;
  

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.team, "Here on card now")
  }


  flip(){
    this.flipped = !this.flipped;
  }

  StartReview(teamName:string){

    this.router.navigate(['review',teamName])

  }

}
