import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { People } from '../../shared/models/people.model';
import { AppStore, SetPeople, SetSearch } from './app-store';

const PEOPLE = [{ id: '123', firstname: 'Sfeir', lastname: 'Sfeir-luxembourg' }] as People[];

describe('AppStore', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([AppStore])],
    });
    store = TestBed.inject(Store);
  });

  test('should create an instance of Store', () => {
    expect(store).toBeInstanceOf(Store);
  });
  test('should the default search be an empty string', ({ expect }) => {
    store.select(AppStore.search).subscribe(value => {
      expect(value).toEqual('');
    });
  });
  test('should the default people be an empty array', ({ expect }) => {
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual([]);
    });
  });
  test('should set the search', ({ expect }) => {
    store.dispatch(new SetSearch('test'));
    store.select(AppStore.search).subscribe(value => {
      expect(value).toEqual('test');
    });
  });
  test('should set the people', ({ expect }) => {
    store.dispatch(new SetPeople(PEOPLE));
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual(PEOPLE);
    });
  });
  test('should filter the people - [cast - respected', ({ expect }) => {
    store.dispatch(new SetPeople(PEOPLE));
    store.dispatch(new SetSearch('sfeir'));
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual(PEOPLE);
    });
  });
  test('should filter the people - [cast - non-respected]', ({ expect }) => {
    store.dispatch(new SetPeople(PEOPLE));
    store.dispatch(new SetSearch('sFEIR'));
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual(PEOPLE);
    });
  });
  test('should filter the people - [or logique]', ({ expect }) => {
    store.dispatch(new SetPeople(PEOPLE));
    store.dispatch(new SetSearch('luxembourg'));
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual(PEOPLE);
    });
  });
  test('should filter the people - [or logique]', ({ expect }) => {
    store.dispatch(new SetPeople(PEOPLE));
    store.dispatch(new SetSearch('Paris'));
    store.select(AppStore.people).subscribe(value => {
      expect(value).toEqual([]);
    });
  });
});
