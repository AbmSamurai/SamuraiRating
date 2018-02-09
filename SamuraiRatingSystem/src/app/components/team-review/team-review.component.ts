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
  criteria = [1, 2, 3, 4, 5];
  Team: String;
  Stars: FormArray = new FormArray([]);
  starIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /* This is collecting the */
    this.Team = this.route.snapshot.paramMap.get("teamname");
    console.log(this.Team);
    for (let i = 0; i < this.criteria.length; i++) {
      this.Stars.push(new FormControl(null, [Validators.required]));
      this.starIds.push(Math.round(Math.random() * (999 - 100 - 1)));
    }

    this.ratingForm = fb.group({
      comment: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(140)])
      ],
      stars: this.Stars
      // [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {}

  submitRating(review) {
    console.log(review);

    const rating = review.stars.reduce((total, val) => total + val);
    console.log(rating);
    this.ratingForm.reset();
  }
}
