import { AngularFirestore } from 'angularfire2/firestore';
import { Criteria } from './../../model/Criteria';
import { forEach } from "@angular/router/src/utils/collection";
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
  // criteria:Observable<Criteria[]>;
  criteria:number[]=[1,2,3,4,5]
  Team: string;
  Stars: FormArray = new FormArray([]);
  starIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dbserv: DatabaseService
  ) {
    /* This is collecting the */
    this.Team = this.route.snapshot.paramMap.get("teamname");
    console.log(this.Team);

    this.ratingForm = fb.group({
      comment: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(140)])
      ],
      stars: this.Stars
    });
  }

  ngOnInit() {
   // this.criteria = this.dbserv.getCriteria().map(res => res as Criteria[])
   // console.log(this.criteria);

   // console.log(this.criteria);
    this.criteria.forEach(ele => {
      this.Stars.push(new FormControl(null, [Validators.required]));
      this.starIds.push(Math.round(Math.random() * (99 - 1) + 1));
    });
  }

  submitRating(review) {
    console.log(review);
    const rating = review.stars.reduce((total, val) => total + val);
   this.dbserv.updateRating(rating,this.Team)
    this.ratingForm.reset();
  }
}
