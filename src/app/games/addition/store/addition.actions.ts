import { Action } from '@ngrx/store';

export const NEW_BOX = '[Addition] Magic Box';
export const ADD_BOX = '[Addition] Add Box';

export class NewBox implements Action {
  readonly type = NEW_BOX;
}

export class AddBox implements Action {
  readonly type = ADD_BOX;
  constructor(public payload: {num1:number, num2:number, num3:number, num4:number, num5:number, num6:number, total:number}){}
}

export type AdditionActionsTypes =
  | NewBox
  | AddBox
