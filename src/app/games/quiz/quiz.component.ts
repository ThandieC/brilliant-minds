import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as QuizActions from '../quiz/store/quiz.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  randomNum: number;
  selected: boolean = false;
  cluesLeft: number = 10;
  clueValue: string = 'No Clue Selected. Please Select A Clue.';
  greater: string;
  smaller: string;
  multiple: string;
  empty: string = '';
  confirmClue: boolean;
  checkClue: boolean = false;
  initSub: Subscription;
  clueSub: Subscription;
  answerSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new QuizActions.NewNumber());
    this.initSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.randomNum = quizState.randomNumber;
        console.log(this.randomNum);
      });
  }

  onShowClues() {
    this.selected = true;
    this.checkClue = false;
    this.cluesLeft -= 1;
    if (this.cluesLeft < 0) {
      this.selected = false;
      this.cluesLeft = 0;
    }
  }

  // onGreaterThan() {
  //   this.onSelectedClue();
  //   this.clueValue = 'Is The Number Greater Than ' + this.greater + '?';
  // }

  onLessThan() {
    // this.onSelectedClue();
    this.clueValue = 'Is The Number Less Than ' + this.smaller + '?';
  }

  onEvenNum() {
    //  this.onSelectedClue();
    this.clueValue = 'Is The Number An Even Number?';
  }

  onOddNum() {
    //  this.onSelectedClue();
    this.clueValue = 'Is The Number An Odd Number?';
  }

  onMultipleOf() {
    //  this.onSelectedClue();
    this.clueValue = 'Is The Number A Multiple Of ' + this.multiple + '?';
  }

  onSelectedClue(val: boolean) {
    this.checkClue = false;
    this.selected = false;
    setTimeout(() => {
      this.checkClue = true;
      this.confirmClue = val;
    }, 1000);
  }

  onGreaterThan() {
    this.store.dispatch(new QuizActions.CheckGreater(+this.greater));
    this.clueSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.clueValue = 'Is The Number Greater Than ' + this.greater + '?';
        this.onSelectedClue(quizState.clue);
      });
  }

  onCheckAnswer() {}
}
