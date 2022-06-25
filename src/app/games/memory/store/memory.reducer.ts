import * as MemoryActions from './memory.actions';

export interface State {
  solved: boolean;
  randomNum: number;
}

export const initialState: State = {
  solved: false,
  randomNum: Math.floor(Math.random() * 10000),
};

export function memoryReducer(
  state = initialState,
  action: MemoryActions.MemoryActionsTypes
) {
  switch (action.type) {
    case MemoryActions.COMPARE_NUMBERS:
      if (state.randomNum == action.payload.userNumber) {
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

    case MemoryActions.CREATE_RANDOM:
      if (action.payload.selectedlevel == 'Beginner') {
        return {
          ...state,
          randomNum: Math.floor(Math.random() * 10000),
        };
      }
      if (action.payload.selectedlevel == 'Easy') {
        return {
          ...state,
          randomNum: Math.floor(Math.random() * 1000000),
        };
      }
      if (action.payload.selectedlevel == 'Moderate') {
        return {
          ...state,
          randomNum: Math.floor(Math.random() * 100000000),
        };
      }
      if (action.payload.selectedlevel == 'Difficult') {
        return {
          ...state,
          randomNum: Math.floor(Math.random() * 10000000000),
        };
      }
      if (action.payload.selectedlevel == 'Super') {
        return {
          ...state,
          randomNum: Math.floor(Math.random() * 1000000000000),
        };
      }
  }
}
