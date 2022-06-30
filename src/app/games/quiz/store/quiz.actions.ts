import { Action } from '@ngrx/store';

export const NEW_NUMBER = '[Quiz] New Number';
export const CHECK_GREATER = '[Quiz] Check Greater';
export const CHECK_ANSWER = '[Quiz] Check Answer';

export class NewNumber implements Action {
  readonly type = NEW_NUMBER;
}

export class CheckGreater implements Action {
  readonly type = CHECK_GREATER;
  constructor(public payload: number) {}
}

export type QuizActionsTypes = NewNumber | CheckGreater;
