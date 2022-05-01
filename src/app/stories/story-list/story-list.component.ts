import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as StoriesActions from '../store/stories.actions';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  newStories = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch( new StoriesActions.SetStories() );
    this.sub = this.store.select( 'stories' ).pipe(
      map(
        StoriesState => {
          return StoriesState.storiesArray;
        }
      )
    ).subscribe(
      storiesArray => {
        this.newStories = storiesArray;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
