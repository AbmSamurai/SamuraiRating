import { AngularFirestore } from "angularfire2/firestore";
import { Criteria, Question } from "./../../model/Criteria";
import { Observable } from "rxjs/Rx";
import { DatabaseService } from "./../../service/database.service";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-team-review",
  templateUrl: "./team-review.component.html",
  styleUrls: ["./team-review.component.css"]
})
export class TeamReviewComponent implements OnInit {
  ratingForm: FormGroup;
  rating = 0;
  criteria: Criteria[];

  Team: string;
  Stars: FormArray = new FormArray([]);
  starIds: number[][] = [];
  visible:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dbserv: DatabaseService
  ) {
    /* This is collecting the */
    this.Team = this.route.snapshot.paramMap.get("teamname");
    console.log(this.Team);
    this.populateStars();
    this.ratingForm = fb.group({
      comment: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(140)])
      ],
      stars: this.Stars
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.visible = true;
    }, 2500);
  }
  //
  submitRating(review) {
    console.log(review);
    const rating = review.stars.reduce((total, val) => total + val);
    this.dbserv.updateRating(rating, this.Team);
    this.ratingForm.reset();
  }

  populateStars(): void {
   // this.criteria = this.dbserv.getCriteria().map(res => res as Criteria[]);
   // console.log(this.criteria);
    let index = 0;

    // this.criteria.subscribe(res => {
     
    //   for (var Question in res) {
    //     let temp: number[] = [];
    //     console.log(index);
    //     this.Stars.push(new FormControl(null, [Validators.required]));
    //     for (var i = 0; i < 5; i++) {
    //       console.log(i);
    //       temp.push(Math.round(Math.random() * (500 - 1) + 1));
    //     }
    //     this.starIds[index] = temp;
    //     console.log(this.starIds);
    //     index++;
    //   }
    // });

    this.dbserv.getCriteria().subscribe(res => {
      this.criteria = res;
      console.log(this.criteria)
        for (var Question in res) {
          let temp: number[] = [];
          console.log(index);
          this.Stars.push(new FormControl(null, [Validators.required]));
          for (var i = 0; i < 5; i++) {
            console.log(i);
            temp.push(Math.round(Math.random() * (500 - 1) + 1));
          }
          this.starIds[index] = temp;
          console.log(this.starIds);
          index++;
        }
    });
  }
}
// consol e.log(this.criteria);
//     this.criteria.forEach((ele)=>{
//       temp = ele;
//       console.log(ele);
//     }).then(function(){
//       temp.forEach((ele,index) => {
//          this.Stars.push(new FormControl(null, [Validators.required]));
//  for (var i = 0; i < 5; i++) {
//    console.log(i);
//     this.starIds[index].push(Math.round(Math.random() * (99 - 1) + 1));
//    }
//       });
//     })
//
