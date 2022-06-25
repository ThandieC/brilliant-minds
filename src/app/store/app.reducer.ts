import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromStories from '../stories/store/stories.reducer';
import * as fromAddition from '../games/addition/store/addition.reducer';
import * as fromMemory from '../games/memory/store/memory.reducer';
import * as fromPyramid from '../games/pyramid/store/pyramid.reducer';
//import * as fromQuiz from '../games/quiz/store/quiz.reducer';

export interface AppState {
  auth: fromAuth.State;
  stories: fromStories.State;
  addition: fromAddition.State;
  memory: fromMemory.State;
  pyramid: fromPyramid.State;
  //quiz: fromQuiz.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: fromAuth.authReducer,
  stories: fromStories.storiesReducer,
  addition: fromAddition.additionReducer,
  memory: fromMemory.memoryReducer,
  pyramid: fromPyramid.pyramidReducer,
  //quiz: fromQuiz,
};
