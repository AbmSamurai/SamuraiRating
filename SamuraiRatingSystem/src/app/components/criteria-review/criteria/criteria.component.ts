import { DatabaseService } from './../../../service/database.service';
import { Question, Criteria } from './../../../model/Criteria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
questions: Question[] = [];
quest: Question[];
add: Boolean = false;
addNew: string = '';

  constructor(private dbConn: DatabaseService) { 
    // this.questions.push(
    //   { Question: 'How was the presentation? *' },
    //   { Question: 'Estimation Accuracy *' },
    //   { Question: 'Bug free *' },
    //   { Question: 'Efficiency *' },
    //   { Question: 'Overall impressions *' },)
  }

  ngOnInit() {
    this.dbConn.getCriteria().subscribe(element => {
        
      element.map(res => {
        this.questions.push(
          new Question(res)
        );

        // console.log(res. + "here")
      })

      console.log(this.questions + "here")
      
    })

    // this.quest = this.questions.Questions;
    
  }

  showAdd(state){
    this.add = state;
  }

  addCriteria(addNew){
    if(this.addNew == ''){
      alert('Really?!');
    }else {
      // this.questions.push(
      //   { Question: addNew });
      
      // this.addNew = ''
    }
    
  }

}
 