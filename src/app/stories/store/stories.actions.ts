import { Action } from '@ngrx/store';
import { StoryModel } from '../../shared/story.model';

export const SET_STORIES = '[Stories] Set Stories';
export const FETCH_STORIES = '[Stories] Fetch Stories';
export const SET_STORY = '[Stories] Set Story';
export const GET_QUESTIONS = '[Stories] Get Question';
export const SHOW_ANSWER = '[Stories] Show Answer';

export class FetchStories implements Action {
  readonly type = FETCH_STORIES;
}

export class SetStories implements Action {
  readonly type = SET_STORIES;
}

export class SetStory implements Action {
  readonly type = SET_STORY;
}

export class GetQuestions implements Action {
  readonly type = GET_QUESTIONS;
}

export class ShowAnswer implements Action {
  readonly type = SHOW_ANSWER;
  constructor(public payload: {qsn: string, ans: string}){}
}

export type StoriesActionsTypes =
  | FetchStories
  | SetStories
  | GetQuestions
  | ShowAnswer

