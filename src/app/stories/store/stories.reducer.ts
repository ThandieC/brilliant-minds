import * as StoriesActions from './stories.actions';
import * as stories from '../../stories-library/library-list';
import { StoryModel } from 'src/app/shared/story.model';

export interface State{
  question: string,
  answer: string,
  correctAns: boolean,
  storiesArray: StoryModel[],
};

export const initialState: State = {
  question: null,
  answer: null,
  correctAns: false,
  storiesArray: stories.storyArray
}

export function storiesReducer( state = initialState, action: StoriesActions.StoriesActionsTypes ) {

  switch ( action.type ) {
    case StoriesActions.SET_STORIES:
      return {
        ...state,
      }

    case StoriesActions.GET_QUESTIONS:
        return {
          ...state,
      }
    case StoriesActions.SHOW_ANSWER:

        return {
        ...state,
        question: action.payload.qsn,
        answer: action.payload.ans,
      }



  }
}

