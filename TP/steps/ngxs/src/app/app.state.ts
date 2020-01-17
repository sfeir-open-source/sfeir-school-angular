import { State } from '@ngxs/store';

export interface AppStateModel {
  people: Array<Object>;
  search: string;
}

export class SetPeople {
  constructor(public payalod: any) {}
}

export class FilterPeople {
  constructor(public payload) {}
}

@State<AppStateModel>({
  name: 'people',
  defaults: {
    people: [],
    search: ''
  }
})
export class AppState {}
