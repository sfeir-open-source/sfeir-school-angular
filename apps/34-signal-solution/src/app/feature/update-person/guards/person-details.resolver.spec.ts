import { Component, Injector, runInInjectionContext } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { PeopleService } from '../../../core/providers/people.service';
import { People } from '../../../shared/models/people.model';
import { personDetailsResolver } from './person-details.resolver';

const PERSON = { id: '123', lastname: 'SFEIR', firstname: 'SFEIR ' } as People;
const ACTIVATED_ROUTE_SNAPSHOT = {
  paramMap: new Map([['id', '123']]),
};
const PEOPLE_SERVICE = {
  getPersonDetails: jest.fn().mockReturnValue(of(PERSON)),
};

@Component({ template: '' })
class ContainerProviderComponent {}

describe('PersonDetailsResolver', () => {
  let injector: Injector;
  beforeEach(async () => {
    await render(ContainerProviderComponent, { providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }] });
    injector = TestBed.inject(Injector);
  });
  test('should return the details of a person', fakeAsync(() => {
    let person = null;
    const result = runInInjectionContext(injector, () => {
      return personDetailsResolver(ACTIVATED_ROUTE_SNAPSHOT as any);
    });
    result.subscribe(personDetails => (person = personDetails));
    tick();
    expect(person).toEqual(PERSON);
  }));
});
