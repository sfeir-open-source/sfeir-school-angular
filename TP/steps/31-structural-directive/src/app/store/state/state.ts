export interface State {
  people: Object[];
  search: string;
}

export interface PeopleFeature {
  people: State;
}

export const initialState = {
  people: [],
  search: ''
};
