import { Component } from '@angular/core';
import { AppStoreService } from './app.store';
import { render } from '@testing-library/angular';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { People } from '../../shared/models/people.model';

const PEOPLE = [{ id: '123', firstname: 'Sfeir', lastname: 'Sfeir-luxembourg' }] as Array<People>;

@Component({ template: '' })
class HostProviderComponent {}
describe('AppStore', () => {
  let storeService: AppStoreService;

  beforeEach(async () => {
    await render(HostProviderComponent, { providers: [AppStoreService] });
    storeService = TestBed.inject(AppStoreService);
  });

  test('should create an instance of AppStoreService', () => {
    expect(storeService).toBeInstanceOf(AppStoreService);
  });
  test('should set the initial search value to empty string', fakeAsync(() => {
    let search = null;
    storeService.selectSearch().subscribe(value => (search = value));
    tick();
    expect(search).toBe('');
  }));
  test('should set the initial value of peopleEntities to empty array', fakeAsync(() => {
    let people = null;
    storeService.selectPeople().subscribe(value => (people = value));
    tick();
    expect(people).toEqual([]);
  }));
  test('should update the people entities', fakeAsync(() => {
    let people = null;
    storeService.setPeopleEntities(PEOPLE);
    storeService.selectPeople().subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should update the search value', fakeAsync(() => {
    let search = null;
    storeService.setSearch('Sfeir');
    storeService.selectSearch().subscribe(value => (search = value));
    tick();
    expect(search).toBe('Sfeir');
  }));
  test('should correctly filter the people entities [case respect]', fakeAsync(() => {
    let people = null;
    storeService.setSearch('Sfeir');
    storeService.setPeopleEntities(PEOPLE);
    storeService.selectPeople().subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should correctly filter the people entities [case non-respect]', fakeAsync(() => {
    let people = null;
    storeService.setSearch('SFEIR');
    storeService.setPeopleEntities(PEOPLE);
    storeService.selectPeople().subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
  test('should correctly filter the people entities [or condition]', fakeAsync(() => {
    let people = null;
    storeService.setSearch('luxembourg');
    storeService.setPeopleEntities(PEOPLE);
    storeService.selectPeople().subscribe(value => (people = value));
    tick();
    expect(people).toEqual(PEOPLE);
  }));
});
