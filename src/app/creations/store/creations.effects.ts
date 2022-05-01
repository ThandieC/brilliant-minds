import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CreationsActions from './creations.actions';
import { StoryModel } from '../../shared/story.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class CreationsEffects {
  @Effect()
  fetchCreations = this.action$.pipe(
    ofType(CreationsActions.FETCH_CREATIONS),
    switchMap(() => {
      return this.http
        .get<StoryModel[]>(
          'https://brilliant-minds-app-default-rtdb.firebaseio.com/creations.json'
        )
        .pipe(
          map((creations) => {
            return creations.map((creation) => {
              return {
                ...creation,
              };
            });
          }),
          map((creation) => {
            return new CreationsActions.SetCreations(creation);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  saveCreations = this.action$.pipe(
    ofType(CreationsActions.STORE_CREATIONS),
    withLatestFrom(this.store.select('creations')), // Allows us to merge a value from another observable
    switchMap(([actionData, creationsState]) => {
      // Array Destructuring (use of square brackets to store array elements in variables)
      return this.http.put(
        'https://brilliant-minds-app-default-rtdb.firebaseio.com/creations.json',
        creationsState.creationsArray
      );
    })
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
  ) {}
}
