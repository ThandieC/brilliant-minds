import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as QuizActions from '../quiz/store/quiz.actions';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [
    trigger('clueState', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition(
        'hidden => visible',
        animate(
          800,
          keyframes([
            style({
              opacity: 0,
              offset: 0.5,
            }),
            style({
              opacity: 0.5,
              offset: 0.8,
            }),
            style({
              opacity: 1,
              offset: 1,
            }),
          ])
        )
      ),
      transition('visible => hidden', animate(300)),
    ]),
    trigger('retry', [
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'scale(0)',
        })
      ),
      state(
        'show',
        style({
          opacity: 0,
          transform: 'scale(0)',
        })
      ),
      transition(
        'hide => show',
        animate(
          1500,
          keyframes([
            style({
              opacity: 0,
              transform: 'scale(0)',

              offset: 0.2,
            }),
            style({
              opacity: 1,
              transform: 'scale(1.5)',
              offset: 0.4,
            }),
            style({
              opacity: 1,
              transform: 'scale(1.5)',
              offset: 0.6,
            }),
            style({
              opacity: 1,
              transform: 'scale(1)',
              offset: 0.8,
            }),
            style({
              opacity: 0,
              transform: 'scale(0)',
              offset: 1,
            }),
          ])
        )
      ),
      transition('show => hide', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'scale(0)',
          })
        ),
      ]),
    ]),
    trigger('gameOver', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class QuizComponent implements OnInit, OnDestroy {
  randomNum: number;
  selected: boolean = false;
  chancesLeft: number = 10;
  clueValue: string = 'No Clue Selected. Please Select A Clue.';
  greater: string;
  smaller: string;
  multiple: string;
  confirmClue: boolean;
  finished: boolean = false;
  userAnswer: number;
  solved: boolean = false;

  initSub: Subscription;
  clueSub: Subscription;
  answerSub: Subscription;
  state = 'hidden';
  doneState = 'hide';

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
        console.log(this.randomNum);
      });
  }

  onShowClues() {
    this.state = 'hidden';
    this.selected = true;
    this.doneState = 'hide';
    this.chancesLeft -= 1;
    this.chancesFinished();
  }

  chancesFinished() {
    if (this.chancesLeft < 0) {
      this.selected = false;
      this.chancesLeft = 0;
      this.finished = true;
    }
  }

  selectedClue(val: boolean) {
    this.state = 'visible';
    this.doneState = 'hide';
    this.selected = false;
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

  resetState() {
    this.doneState = 'hide';
  }

  onCheckAnswer() {
    this.store.dispatch(new QuizActions.CheckAnswer(+this.userAnswer));
    this.chancesLeft -= 1;
    this.chancesFinished();
    this.answerSub = this.store
      .select('quiz')
      .pipe(
        map((quizState) => {
          return quizState;
        })
      )
      .subscribe((quizState) => {
        this.solved = quizState.solved;
        this.doneState = 'show';
        this.reset();
      });
  }

  reset() {
    this.greater = '';
    this.smaller = '';
    this.multiple = '';
    this.userAnswer = null;
    this.state = 'hidden';
    this.clueValue = 'No Clue Selected. Please Select A Clue.';
  }

  onNewGame() {
    this.chancesLeft = 10;
    this.doneState = 'hide';
    this.onNewNumber();
  }

  onReplay() {
    this.finished = false;
    this.chancesLeft = 10;
  }

  ngOnDestroy(): void {
    this.initSub.unsubscribe();
    this.clueSub.unsubscribe();
    this.answerSub.unsubscribe();
    this.reset();
  }
}
