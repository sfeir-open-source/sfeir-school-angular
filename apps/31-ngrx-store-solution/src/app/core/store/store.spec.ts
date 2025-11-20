import { Component } from '@angular/core';
import { provideStore, Store } from '@ngrx/store';
import { AppStore } from './state';
import { render } from '@testing-library/angular';
import { appReducer } from './reducer';
import { TestBed } from '@angular/core/testing';
import { selectPeople, selectSearch } from './selector';
import { People } from '../../shared/models/people.model';
import { setPeople, setSearch } from './action';

const PEOPLE = [
  { id: '1', firstname: 'John', lastname: 'Doe' },
  { id: '2', firstname: 'Marie', lastname: 'Doe' },
] as Array<People>;

@Component({ template: '' })
class HostProviderComponent {}

describe('Store', () => {
  let store: Store<AppStore>;

  beforeEach(async () => {
    await render(HostProviderComponent, { providers: [provideStore({ store: appReducer })] });
    store = TestBed.inject(Store);
  });

  test('should create an instance of the store', () => {
    expect(store).toBeInstanceOf(Store);
  });
  test('should have an empty string as initial search', ({ expect }) => {
    store.select(selectSearch).subscribe(data => {
      expect(data).toEqual('');
    });
  });
  test('should have an empty array as initial people', ({ expect }) => {
    store.select(selectPeople).subscribe(data => {
      expect(data).toEqual([]);
    });
  });
  test('should set the search', ({ expect }) => {
    store.dispatch(setSearch({ search: 'test' }));
    store.select(selectSearch).subscribe(data => {
      expect(data).toEqual('test');
    });
  });
  test('should set the people', ({ expect }) => {
    store.dispatch(setPeople({ people: PEOPLE }));
    store.select(selectPeople).subscribe(data => {
      expect(data).toEqual(PEOPLE);
    });
  });
  test('should filter the people [cast sensitive]', ({ expect }) => {
    store.dispatch(setPeople({ people: PEOPLE }));
    store.dispatch(setSearch({ search: 'John' }));
    store.select(selectPeople).subscribe(data => {
      expect(data).toEqual([PEOPLE[0]]);
    });
  });
  test('should filter the people [cast insensitive]', ({ expect }) => {
    store.dispatch(setPeople({ people: PEOPLE }));
    store.dispatch(setSearch({ search: 'john' }));
    store.select(selectPeople).subscribe(data => {
      expect(data).toEqual([PEOPLE[0]]);
    });
  });
  test('should filter the people [firstname or lastname]', ({ expect }) => {
    store.dispatch(setPeople({ people: PEOPLE }));
    store.dispatch(setSearch({ search: 'doe' }));
    store.select(selectPeople).subscribe(data => {
      expect(data).toEqual(PEOPLE);
    });
  });
});
