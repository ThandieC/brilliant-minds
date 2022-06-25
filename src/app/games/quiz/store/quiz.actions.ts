import { Action } from '@ngrx/store';

export const NEW_PYRAMID = '[Pyramid] New Box';
export const ADD_PYRAMID = '[Pyramid] Add Box';

export class NewPyramid implements Action {
  readonly type = NEW_PYRAMID;
}

export class AddPyramid implements Action {
  readonly type = ADD_PYRAMID;
  constructor(
    public payload: {
      num1: number;
      num2: number;
      num3: number;
      num4: number;
      num5: number;
      num6: number;
      num7: number;
      num8: number;
    }
  ) {}
}

export type QuizActionsTypes = NewPyramid | AddPyramid;
