import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
@Component({
  selector: "app-team-review",
  templateUrl: "./team-review.component.html",
  styleUrls: ["./team-review.component.css"]
})
export class TeamReviewComponent implements OnInit {
  ratingForm: FormGroup;
  rating = 0;
  criteria = [1, 2, 3, 4, 5];
  Stars: FormArray = new FormArray([]);
  starIds: Number[] = [];

  constructor(private fb: FormBuilder) {
    /* This is collecting the */
    for (let i = 0; i < this.criteria.length; i++) {
      this.Stars.push(new FormControl(null, [Validators.required]));
      this.starIds.push(Math.round(Math.random() * (999 - 100 - 1)));
    }
    console.log(this.starIds);

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
