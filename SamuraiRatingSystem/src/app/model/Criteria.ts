export class Criteria{
    Questions: Question[];

    constructor(ques){
        this.Questions = ques;
    }
}

export class Question{
    Question: string;

    constructor(ques){
        this.Question = ques;
    }
}