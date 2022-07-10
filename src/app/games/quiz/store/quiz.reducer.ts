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
        randomNumber: Math.floor(Math.random() * 100 + 1),
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
    case QuizActions.CHECK_SMALLER:
      if (action.payload > state.randomNumber) {
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
    case QuizActions.CHECK_EVEN:
      if (state.randomNumber % 2 == 0) {
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
    case QuizActions.CHECK_ODD:
      if (state.randomNumber % 2 == 1) {
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
    case QuizActions.CHECK_MULTIPLE:
      if (state.randomNumber % action.payload == 0) {
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
    case QuizActions.CHECK_ANSWER:
      if (action.payload == state.randomNumber) {
        return {
          ...state,
          solved: true,
        };
      } else {
        return {
          ...state,
          solved: false,
        };
      }
  }
}
