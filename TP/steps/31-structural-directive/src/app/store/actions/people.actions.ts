import { createAction, props } from '@ngrx/store';

const SET_PEOPLE = 'SET_PEOPLE';
const FILTER_PEOPLE = 'FILTER_PEOPLE';

export const setPeople = createAction(SET_PEOPLE, props<{ people: any }>());
export const filterPeople = createAction(FILTER_PEOPLE, props<{ search: string }>());
