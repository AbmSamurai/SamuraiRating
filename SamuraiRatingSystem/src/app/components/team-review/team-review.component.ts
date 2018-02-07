import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
@Component({
  selector: 'app-team-review',
  templateUrl: './team-review.component.html',
  styleUrls: ['./team-review.component.css']
})
export class TeamReviewComponent implements OnInit {
  Questions: String[];

  ratingForm: FormGroup;
  rating = 0;
  criteria = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  Stars: FormArray = new FormArray([]);
  starIds: Number[];

  constructor(private fb: FormBuilder) {
    this.Questions = ['Hello', 'Hello'];

    console.log(this.ratingForm);
    for (let i = 0; i < this.criteria.length; i++) {
      this.Stars.push(new FormControl(null, [Validators.required]));
      this.starIds.push((Math.random() * (999 - 100 - 1))
    }
    this.ratingForm = fb.group({
      'comment': [null, Validators.compose([Validators.required, Validators.maxLength(140)])],
      'stars': this.Stars
      // [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {}

}
