import { Component } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { AppStore } from './state';
import { render } from '@testing-library/angular';
import { appReducer } from './reducer';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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
    await render(HostProviderComponent, { imports: [StoreModule.forRoot({ store: appReducer })] });
    store = TestBed.inject(Store);
  });

  test('should create an instance of the store', () => {
    expect(store).toBeInstanceOf(Store);
  });
  test('should have an empty string as initial search', fakeAsync(() => {
    let search: string;
    store.select(selectSearch).subscribe(data => (search = data));
    tick();
    expect(search).toEqual('');
  }));
  test('should have an empty array as initial people', fakeAsync(() => {
    let people: Array<People>;
    store.select(selectPeople).subscribe(data => (people = data));
    tick();
    expect(people).toEqual([]);
  }));
  test('should set the search', fakeAsync(() => {
    let search: string;
    store.select(selectSearch).subscribe(data => (search = data));
    tick();
    expect(search).toEqual('');
    store.dispatch(setSearch({ search: 'test' }));
    tick();
    expect(search).toEqual('test');
  }));
  test('should set the people', fakeAsync(() => {
    let people: Array<People>;
    store.select(selectPeople).subscribe(data => (people = data));
    tick();
    expect(people).toEqual([]);
    store.dispatch(setPeople({ people: PEOPLE }));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should filter the people [cast sensitive]', fakeAsync(() => {
    let people: Array<People>;
    store.select(selectPeople).subscribe(data => (people = data));
    tick();
    store.dispatch(setPeople({ people: PEOPLE }));
    tick();
    store.dispatch(setSearch({ search: 'John' }));
    tick();
    expect(people).toEqual([PEOPLE[0]]);
  }));
  test('should filter the people [cast insensitive]', fakeAsync(() => {
    let people: Array<People>;
    store.select(selectPeople).subscribe(data => (people = data));
    tick();
    store.dispatch(setPeople({ people: PEOPLE }));
    tick();
    store.dispatch(setSearch({ search: 'john' }));
    tick();
    expect(people).toEqual([PEOPLE[0]]);
  }));
  test('should filter the people [firstname or lastname]', fakeAsync(() => {
    let people: Array<People>;
    store.select(selectPeople).subscribe(data => (people = data));
    tick();
    store.dispatch(setPeople({ people: PEOPLE }));
    tick();
    store.dispatch(setSearch({ search: 'doe' }));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
});
