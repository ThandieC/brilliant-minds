import { Action } from '@ngrx/store';

export const CREATE_RANDOM = '[Memory] Create Random';
export const COMPARE_NUMBERS = '[Memory] Compare Numbers';

export class CreateRandom implements Action {
  readonly type = CREATE_RANDOM;
  constructor(
    public payload: {
      selectedlevel: string;
    }
  ) {}
}

export class CompareNumbers implements Action {
  readonly type = COMPARE_NUMBERS;
  constructor(
    public payload: {
      userNumber: number;
    }
  ) {}
}

export type MemoryActionsTypes = CreateRandom | CompareNumbers;
