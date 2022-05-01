import * as CreationsActions from './creations.actions';
import { StoryModel } from '../../shared/story.model';

export interface State {
  user: { username: string; email: string };
  question: string;
  answer: string;
  correctAns: boolean;
  creationsArray: StoryModel[];
}

export const initialState: State = {
  user: { username: null, email: null },
  question: null,
  answer: null,
  correctAns: false,
  creationsArray: [],
};

export function creationsReducer(
  state = initialState,
  action: CreationsActions.CreationsActionsTypes
) {
  switch (action.type) {
    case CreationsActions.SET_CREATIONS:
      return {
        ...state,
        creationsArray: [...action.payload],
      };

    case CreationsActions.ADD_CREATION:
      return {
        ...state,
        creationsArray: [...state.creationsArray, action.payload],
      };

    case CreationsActions.UPDATE_CREATION:
      const updatedCreation = {
        ...state.creationsArray[action.payload.index],
        ...action.payload.creation,
      };

      const updatedCreations = [...state.creationsArray];
      updatedCreations[action.payload.index] = updatedCreation;

      return {
        ...state,
        creationsArray: updatedCreations,
      };

    case CreationsActions.DELETE_CREATION:
      const newCreationsArray = [...state.creationsArray];
      newCreationsArray.splice(action.payload, 1);
      return {
        ...state,
        creationsArray: newCreationsArray,
      };

    default:
      return state;
  }
}
