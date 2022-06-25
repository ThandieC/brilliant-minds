import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  selected: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onShowClues() {
    this.selected = true;
  }

  onSelectClue() {
    this.selected = false;
  }

  onCheckAnswer() {}
}
