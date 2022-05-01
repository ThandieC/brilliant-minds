import { Action } from '@ngrx/store';
import { StoryModel } from '../../shared/story.model';

export const SET_CREATIONS = '[Creations] Set Creations';
export const FETCH_CREATIONS = '[Creations] Fetch Creations';
export const ADD_CREATION = '[Creations] Add Creation';
export const UPDATE_CREATION = '[Creations] Update Creation';
export const DELETE_CREATION = '[Creations] Delete Creation';
export const STORE_CREATIONS = '[Creations] Store Creations';
export const SET_USER = '[Creations] Set User';
export const FETCH_USER = '[Creations] Fetch User';
export const STORE_USER = '[Creations] Store User';

export class FetchCreations implements Action {
  readonly type = FETCH_CREATIONS;
}

export class SetCreations implements Action {
  readonly type = SET_CREATIONS;
  constructor(public payload: StoryModel[]) {}
}

export class AddCreation implements Action {
  readonly type = ADD_CREATION;
  constructor(public payload: StoryModel) {}
}

export class UpdateCreation implements Action {
  readonly type = UPDATE_CREATION;
  constructor(public payload: { index: number; creation: StoryModel }) {}
}

export class DeleteCreation implements Action {
  readonly type = DELETE_CREATION;
  constructor(public payload: number) {}
}

export class StoreCreations implements Action {
  readonly type = STORE_CREATIONS;
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: string) {}
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;
}

export class StoreUser implements Action {
  readonly type = STORE_USER;
  constructor(public payload: { username: string; email: string }) {}
}

export type CreationsActionsTypes =
  | FetchCreations
  | SetCreations
  | AddCreation
  | UpdateCreation
  | DeleteCreation
  | StoreCreations
  | SetUser
  | FetchUser
  | StoreUser;
