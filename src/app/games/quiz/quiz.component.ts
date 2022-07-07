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
  confirmClue: boolean;
  checkClue: boolean = false;
  userAnswer: number;
  solved: boolean = false;
  feedback: boolean = false;
  initSub: Subscription;
  clueSub: Subscription;
  answerSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.onNewNumber();
  }

  onNewNumber() {
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
        this.solved = false;
        this.feedback = false;
        console.log(this.randomNum);
      });
  }

  onShowClues() {
    this.selected = true;
    this.checkClue = false;
    this.feedback = false;
    this.cluesLeft -= 1;
    if (this.cluesLeft < 0) {
      this.selected = false;
      this.cluesLeft = 0;
    }
  }

  selectedClue(val: boolean) {
    this.selected = false;
    this.checkClue = true;
    this.confirmClue = val;
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
        this.selectedClue(quizState.clue);
      });
  }

  onLessThan() {
    this.store.dispatch(new QuizActions.CheckSmaller(+this.smaller));
    this.clueSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.clueValue = 'Is The Number Less Than ' + this.smaller + '?';
        this.selectedClue(quizState.clue);
      });
  }

  onEvenNum() {
    this.store.dispatch(new QuizActions.CheckEven());
    this.clueSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.clueValue = 'Is The Number An Even Number?';
        this.selectedClue(quizState.clue);
      });
  }

  onOddNum() {
    this.store.dispatch(new QuizActions.CheckOdd());
    this.clueSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.clueValue = 'Is The Number An Odd Number?';
        this.selectedClue(quizState.clue);
      });
  }

  onMultipleOf() {
    this.store.dispatch(new QuizActions.CheckMultiple(+this.multiple));
    this.clueSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.clueValue = 'Is The Number A Multiple Of ' + this.multiple + '?';
        this.selectedClue(quizState.clue);
      });
  }

  onCheckAnswer() {
    this.store.dispatch(new QuizActions.CheckAnswer(+this.userAnswer));
    this.feedback = false;
    this.answerSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.feedback = true;
        this.solved = quizState.solved;
        this.reset();
      });
  }
  reset() {
    this.greater = '';
    this.smaller = '';
    this.multiple = '';
    this.userAnswer = null;
    this.clueValue = 'No Clue Selected. Please Select A Clue.';
  }
  onNewGame() {
    this.cluesLeft = 10;
    this.onNewNumber();
  }
}
