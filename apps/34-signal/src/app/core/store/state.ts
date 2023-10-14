import { People } from '../../shared/models/people.model';

export interface AppState {
  search: string;
  people: Array<People>;
}

export interface AppStore {
  store: AppState;
}

export const INITIAL_STATE: AppState = {
  search: '',
  people: [],
};
