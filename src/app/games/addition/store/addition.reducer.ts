import * as AdditionActions from './addition.actions';

export interface State{
  selected: boolean,
  solved: boolean,
  total: number,
  number1: number,
  number2: number,
  number3: number,
}

export const initialState: State = {
  selected: false,
  solved: false,
  total: 15,
  number1: Math.floor(Math.random()*10),
  number2: Math.floor( Math.random()*10),
  number3: Math.floor( Math.random() * 10 ),
}

export function additionReducer( state = initialState, action: AdditionActions.AdditionActionsTypes ) {

  switch ( action.type ) {
    case AdditionActions.NEW_BOX:
      return {
        ...state,
        number1: Math.floor(Math.random()*10),
        number2: Math.floor( Math.random()*10),
        number3: Math.floor( Math.random() * 10 ),
      }
    case AdditionActions.ADD_BOX:
      const ans1 = state.number1 + action.payload.num1 + action.payload.num2;
      const ans2 = action.payload.num3 + action.payload.num4 + state.number2;
      const ans3 = action.payload.num5 + state.number3 + action.payload.num6;
      const ans4 = state.number1 + action.payload.num3 + action.payload.num5;
      const ans5 = action.payload.num1 + action.payload.num4 + state.number3;
      const ans6 = action.payload.num2 + state.number2 + action.payload.num6;
      const solvedBox = `${ state.number1 }; ${ action.payload.num1 }; ${ action.payload.num2 } \n\r
                      ${ action.payload.num3}; ${ action.payload.num4 }; ${ state.number2 } \n\r
                      ${ action.payload.num5}; ${ state.number3 }; ${ action.payload.num6 }`;
      if ( ans1 === action.payload.total && ans2 === action.payload.total &&
        ans3 === action.payload.total && ans4 === action.payload.total
        && ans5 === action.payload.total && ans6 === action.payload.total ) {
        return {
          ...state,
          solved: true,
          total: action.payload.total,
        }
      } else {
          return {
            ...state,
            solved: false,
            total: action.payload.total,
          }
      }
  }
}

