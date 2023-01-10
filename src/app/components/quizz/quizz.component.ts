import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  Title:string=""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor(){}

  ngOnInit(): void {
    if (quizz_questions){
    this.finished = false
    this.Title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

  }
}

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

    
  }
  
  async nextStep(){
    this.questionIndex += 1 

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
      
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
    console.log(this.answerSelected)

  }

  async checkResult(anwsers:string[]){
  
    const result = anwsers.reduce((previous, current, i, arr ) =>{
      if(
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length 
      ){
        return previous

      }else{
        return current

      }
      
    })
    console.log(anwsers)
    return result 
   
  }

 
  
}


