import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, timeInterval } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { StoryModel } from '../../shared/story.model';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.css'],
})
export class StoryPageComponent implements OnInit {
  story!: StoryModel;
  id!: number;
  question!: string;
  answer!: string;
  showNextQuestion = false;
  answered = false;
  correctAns = false;
  finished = false;
  i = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('stories');
        }),
        map((storiesState) => {
          return storiesState.storiesArray.find((story, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((story) => {
        this.story = story!;
      });
  }

  onShowAnswer(qsn: string, id: string) {
    this.question = document.getElementById('myQuestion')!.textContent ?? ''; //fallback for when the value is null or undefined
    this.answer = document.getElementById(id)!.textContent!; // ! removes null and undefined, tells typescript this value will never be null
    this.answered = true;
    if (this.question === qsn) {
      this.correctAns = true;
      this.showNextQuestion = true;
    } else {
      this.correctAns = false;
      this.showNextQuestion = false;
      this.clearAnswer();
    }
  }

  onWrongAnswer(id: string) {
    this.answered = true;
    this.answer = document.getElementById(id)!.textContent!;
    this.correctAns = false;
    this.clearAnswer();
  }

  clearAnswer() {
    setTimeout(() => {
      this.answer = '';
    }, 1000);
  }

  onNextQsn() {
    this.showNextQuestion = false;
    this.i += 1;
    this.answer = '';
    this.answered = false;
    if (this.i === 10) {
      this.finished = true;
    }
  }

  onRepeatQuestions() {
    this.i = 0;
    this.finished = false;
  }
}
