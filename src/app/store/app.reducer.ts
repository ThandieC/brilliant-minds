import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCreations from '../creations/store/creations.reducer';
import * as fromStories from '../stories/store/stories.reducer';

export interface AppState{
  auth: fromAuth.State,
  creations: fromCreations.State,
  stories: fromStories.State,
 }

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  creations: fromCreations.creationsReducer,
  stories: fromStories.storiesReducer,
}
