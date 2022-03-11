import { createAction, props } from '@ngrx/store';
import { People } from '../../shared/models/people.model';

export const SET_SEARCH = '[APP] - Set Search';
export const SET_PEOPLE = '[APP] - Set People';

export const setSearch = createAction(SET_SEARCH, props<{ search: string }>());
export const setPeople = createAction(SET_PEOPLE, props<{ people: Array<People> }>());
