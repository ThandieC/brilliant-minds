import * as QuizActions from './quiz.actions';

export interface State {
  solved: boolean;
  randomNumber: number;
  clue: boolean;
}

export const initialState: State = {
  solved: false,
  randomNumber: Math.floor(Math.random() * 100 + 1),
  clue: true,
};

export function quizReducer(
  state = initialState,
  action: QuizActions.QuizActionsTypes
) {
  switch (action.type) {
    case QuizActions.NEW_NUMBER:
      return {
        ...state,
        randomNumber: Math.floor(Math.random() * 100 + 10),
      };

    case QuizActions.CHECK_GREATER:
      if (action.payload < state.randomNumber) {
        return {
          ...state,
          clue: true,
        };
      } else {
        return {
          ...state,
          clue: false,
        };
      }
  }
}
