import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromStories from '../stories/store/stories.reducer';

export interface AppState {
  auth: fromAuth.State;
  stories: fromStories.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  stories: fromStories.storiesReducer,
};
