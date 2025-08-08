import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { People } from '../../shared/models/people.model';
import { AppStore } from './app-store';

const PEOPLE = [{ id: '123', firstname: 'Sfeir', lastname: 'Sfeir-luxembourg' }] as Array<People>;

@Component({ template: '' })
class HostProviderComponent {}
describe('AppStore', () => {
  let storeService: AppStore;

  beforeEach(async () => {
    await render(HostProviderComponent, { providers: [AppStore] });
    storeService = TestBed.inject(AppStore);
  });

  test('should create an instance of AppStoreService', () => {
    expect(storeService).toBeInstanceOf(AppStore);
  });
  test('should set the initial search value to empty string', done => {
    storeService.selectSearch$.subscribe(value => {
      expect(value).toBe('');
      done();
    });
  });
  test('should set the initial value of peopleEntities to empty array', done => {
    storeService.selectPeoples$.subscribe(value => {
      expect(value).toEqual([]);
      done();
    });
  });
  test('should update the people entities', done => {
    storeService.selectPeoples$.subscribe(value => {
      expect(value).toEqual(PEOPLE);
      done();
    });
    storeService.setPeople(PEOPLE);
  });
  test('should update the search value', done => {
    storeService.selectSearch$.subscribe(value => {
      expect(value).toBe('Sfeir');
      done();
    });
    storeService.setSearch('Sfeir');
  });
  test('should correctly filter the people entities [case respect]', done => {
    storeService.selectPeoples$.subscribe(value => {
      expect(value).toEqual(PEOPLE);
      done();
    });
    storeService.setSearch('Sfeir');
    storeService.setPeople(PEOPLE);
  });
  test('should correctly filter the people entities [case non-respect]', done => {
    storeService.setPeople(PEOPLE);
    storeService.setSearch('nonexistent');
    storeService.selectPeoples$.subscribe(value => {
      expect(value).toEqual([]); // 'nonexistent' doesn't match any name
      done();
    });
  });
  test('should correctly filter the people entities [or condition]', done => {
    storeService.setSearch('luxembourg');
    storeService.setPeople(PEOPLE);
    storeService.selectPeoples$.subscribe(value => {
      expect(value).toEqual(PEOPLE);
      done();
    });
  });
});
