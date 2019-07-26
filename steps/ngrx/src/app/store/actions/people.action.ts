import { Action } from '@ngrx/store';

export const SET_PEOPLE = 'SET_PEOPLE';
export const FILTER_PEOPLE = 'FILTER_PEOPLE';

export class SetPeople implements Action {
  readonly type = SET_PEOPLE;
  constructor(public payload) {}
}

export class FilterPeople implements Action {
  readonly type = FILTER_PEOPLE;
  constructor(public payload) {}
}

export type Actions = SetPeople | FilterPeople;
