import * as PyramidActions from './pyramid.actions';

export interface State{
  solved: boolean,
  number1: number,
  number2: number,
}

export const initialState: State = {
  solved: false,
  number1: Math.floor(Math.random()*100 + 10),
  number2: Math.floor( Math.random()*10),
}

export function pyramidReducer( state = initialState, action: PyramidActions.PyramidActionsTypes ) {

  switch ( action.type ) {
    case PyramidActions.NEW_PYRAMID:
      return {
        ...state,
        number1: Math.floor(Math.random()*100 + 10),
        number2: Math.floor( Math.random()*10),
      }
    case PyramidActions.ADD_PYRAMID:

      const check1 = action.payload.num1 + action.payload.num2;
      const check2 = action.payload.num3 + action.payload.num4;
      const check3 = action.payload.num4 + action.payload.num5;
      const check4 = action.payload.num6 + action.payload.num7;
      const check5 = action.payload.num7 + action.payload.num8;
      const check6 = action.payload.num8 + state.number2;

      if (
        check1 === state.number1 &&
        check2 === action.payload.num1 &&
        check3 === action.payload.num2 &&
        check4 === action.payload.num3 &&
        check5 === action.payload.num4 &&
        check6 === action.payload.num5 ) {
        return {
          ...state,
          solved: true,
        }
      } else {
          return {
            ...state,
            solved: false,
          }
      }
  }
}

