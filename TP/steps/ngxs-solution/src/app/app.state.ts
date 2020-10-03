import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface AppStateModel {
  people: Object[];
  search: string;
}

export class LoadPeople {
  static readonly type = '[App] LoadPeople';
}

export class SetPeople {
  static readonly type = '[App] SetPeople';
  constructor(public payload) {}
}

export class FilterPeople {
  static readonly type = '[App] FilterPeople';
  constructor(public payload) {}
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    people: [],
    search: ''
  }
})
@Injectable()
export class AppState {
  // HELPERS
  static filterPerson(search) {
    return p => {
      const regExp = new RegExp(search, 'i');
      return regExp.test(p.firstname) || regExp.test(p.lastname) || regExp.test(p.manager);
    };
  }

  @Selector()
  static search(state: AppStateModel) {
    return state.search;
  }

  @Selector()
  static people(state: AppStateModel) {
    return state.people;
  }

  @Selector()
  static filteredPeople(state: AppStateModel) {
    return state.people.filter(AppState.filterPerson(state.search));
  }

  constructor() {}

  @Action(SetPeople)
  setPeople({ getState, setState }: StateContext<AppStateModel>, { payload }: SetPeople) {
    const state = getState();
    setState({
      ...state,
      people: [...payload]
    });
  }

  @Action(FilterPeople)
  setSearch({ getState, setState }: StateContext<AppStateModel>, { payload }: FilterPeople) {
    const state = getState();
    setState({
      ...state,
      search: payload
    });
  }
}
