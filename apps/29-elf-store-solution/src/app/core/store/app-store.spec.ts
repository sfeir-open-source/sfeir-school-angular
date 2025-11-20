import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { skip } from 'rxjs';
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
  test('should set the initial search value to empty string', ({ expect }) => {
    storeService.selectSearch$.subscribe(value => expect(value).toBe(''));
  });
  test('should set the initial value of peopleEntities to empty array', ({ expect }) => {
    storeService.selectPeoples$.subscribe(value => expect(value).toEqual([]));
  });
  test('should update the people entities', ({ expect }) => {
    storeService.selectPeoples$.pipe(skip(1)).subscribe(value => expect(value).toEqual(PEOPLE));
    storeService.setPeople(PEOPLE);
  });
  test('should update the search value', ({ expect }) => {
    storeService.selectSearch$.pipe(skip(1)).subscribe(value => expect(value).toBe('Sfeir'));
    storeService.setSearch('Sfeir');
  });
  test('should correctly filter the people entities [case respect]', ({ expect }) => {
    storeService.setPeople(PEOPLE);
    storeService.setSearch('Sfeir');
    storeService.selectPeoples$.subscribe(value => expect(value).toEqual(PEOPLE));
  });
  test('should correctly filter the people entities [case non-respect]', ({ expect }) => {
    storeService.setPeople(PEOPLE);
    storeService.setSearch('nonexistent');
    storeService.selectPeoples$.subscribe(value => expect(value).toEqual([]));
  });
  test('should correctly filter the people entities [or condition]', ({ expect }) => {
    storeService.setSearch('luxembourg');
    storeService.setPeople(PEOPLE);
    storeService.selectPeoples$.subscribe(value => expect(value).toEqual(PEOPLE));
  });
});
