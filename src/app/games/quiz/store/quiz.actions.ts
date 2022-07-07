import { Action } from '@ngrx/store';

export const NEW_NUMBER = '[Quiz] New Number';
export const CHECK_GREATER = '[Quiz] Check Greater';
export const CHECK_SMALLER = '[Quiz] Check Smaller';
export const CHECK_EVEN = '[Quiz] Check Even';
export const CHECK_ODD = '[Quiz] Check Odd';
export const CHECK_MULTIPLE = '[Quiz] Check Multiple';
export const CHECK_ANSWER = '[Quiz] Check Answer';

export class NewNumber implements Action {
  readonly type = NEW_NUMBER;
}

export class CheckGreater implements Action {
  readonly type = CHECK_GREATER;
  constructor(public payload: number) {}
}

export class CheckSmaller implements Action {
  readonly type = CHECK_SMALLER;
  constructor(public payload: number) {}
}

export class CheckEven implements Action {
  readonly type = CHECK_EVEN;
}

export class CheckOdd implements Action {
  readonly type = CHECK_ODD;
}

export class CheckMultiple implements Action {
  readonly type = CHECK_MULTIPLE;
  constructor(public payload: number) {}
}

export class CheckAnswer implements Action {
  readonly type = CHECK_ANSWER;
  constructor(public payload: number) {}
}

export type QuizActionsTypes =
  | NewNumber
  | CheckGreater
  | CheckSmaller
  | CheckEven
  | CheckOdd
  | CheckMultiple
  | CheckAnswer;
