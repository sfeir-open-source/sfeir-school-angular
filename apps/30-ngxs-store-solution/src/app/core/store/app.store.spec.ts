import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { People } from '../../shared/models/people.model';
import { AppStore, SetPeople, SetSearch } from './app.store';

@Component({ template: '' })
class HostProviderComponent {}

const PEOPLE = [{ id: '123', firstname: 'Sfeir', lastname: 'Sfeir-luxembourg' }] as People[];

describe('AppStore', () => {
  let store: Store;

  beforeEach(async () => {
    await render(HostProviderComponent, { imports: [NgxsModule.forRoot([AppStore])] });
    store = TestBed.inject(Store);
  });

  test('should create an instance of Store', () => {
    expect(store).toBeInstanceOf(Store);
  });
  test('should the default search be an empty string', fakeAsync(() => {
    let search = null;
    store.select(AppStore.search).subscribe(value => (search = value));
    tick();
    expect(search).toEqual('');
  }));
  test('should the default people be an empty array', fakeAsync(() => {
    let people = null;
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    expect(people).toEqual([]);
  }));
  test('should set the search', fakeAsync(() => {
    let search = null;
    store.select(AppStore.search).subscribe(value => (search = value));
    tick();
    expect(search).toEqual('');
    store.dispatch(new SetSearch('test'));
    tick();
    expect(search).toEqual('test');
  }));
  test('should set the people', fakeAsync(() => {
    let people = null;
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    store.dispatch(new SetPeople(PEOPLE));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should filter the people - [cast - respected', fakeAsync(() => {
    let people = null;
    store.dispatch(new SetPeople(PEOPLE));
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
    store.dispatch(new SetSearch('sfeir'));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should filter the people - [cast - non-respected]', fakeAsync(() => {
    let people = null;
    store.dispatch(new SetPeople(PEOPLE));
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
    store.dispatch(new SetSearch('sFEIR'));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should filter the people - [or logique]', fakeAsync(() => {
    let people = null;
    store.dispatch(new SetPeople(PEOPLE));
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
    store.dispatch(new SetSearch('luxembourg'));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should filter the people - [or logique]', fakeAsync(() => {
    let people = null;
    store.dispatch(new SetPeople(PEOPLE));
    store.select(AppStore.people).subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
    store.dispatch(new SetSearch('Paris'));
    tick();
    expect(people).toEqual([]);
  }));
});
