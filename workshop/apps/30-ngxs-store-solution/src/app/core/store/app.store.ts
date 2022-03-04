import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { People } from '../../shared/models/people.model';

export interface AppState {
  people: People[];
  search: string;
}

export class SetPeople {
  static readonly type = '[App] SetPeople';
  constructor(public payload) {}
}

export class SetSearch {
  static readonly type = '[App] SetSearch';
  constructor(public payload) {}
}

@State<AppState>({
  name: 'app',
  defaults: {
    people: [],
    search: '',
  },
})
@Injectable()
export class AppStore {
  // HELPERS
  static filterPerson(search: string) {
    return (people: People) =>
      people.lastname.toLowerCase().includes(search.toLowerCase()) || people.firstname.toLowerCase().includes(search.toLowerCase());
  }

  @Selector()
  static search(state: AppState): string {
    return state.search;
  }

  @Selector()
  static people(state: AppState): Array<People> {
    return state.people.filter(AppStore.filterPerson(state.search));
  }

  @Action(SetPeople)
  setPeople({ getState, setState }: StateContext<AppState>, { payload }: SetPeople): void {
    const state = getState();
    setState({
      ...state,
      people: payload,
    });
  }

  @Action(SetSearch)
  setSearch({ getState, setState }: StateContext<AppState>, { payload }: SetSearch): void {
    const state = getState();
    setState({
      ...state,
      search: payload,
    });
  }
}
