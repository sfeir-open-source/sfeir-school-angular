import { TestBed } from '@angular/core/testing';
import { Router, type ActivatedRouteSnapshot, type UrlSegment } from '@angular/router';
import { defer, of, type Observable } from 'rxjs';
import { vi } from 'vitest';
import type { People } from '../../shared/models/people.model';
import { PeopleService } from '../providers/people.service';
import { personDetailsResolver, updatePersonGuard } from './main-routing-guard';

const ROUTER = {
  createUrlTree: vi.fn(),
};

const ROUTE = {};

const ACTIVATED_ROUTER_SNAPSHOT = {
  paramMap: {
    get: vi.fn(() => '123'),
  },
} as any;

const PERSON = {
  id: '123',
  firstname: 'John',
  lastname: 'Doe',
} as People;

const PEOPLE_SERVICE_STUB = {
  getPersonDetails: vi.fn(() => defer(() => of(PERSON))),
};

describe('MainRouterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: ROUTER },
        { provide: PeopleService, useValue: PEOPLE_SERVICE_STUB },
      ],
    });
  });

  describe('#updatePersonGuard', () => {
    it('should return true if the id of person is valid', () => {
      const segments = [{ path: 'people' }, { path: 'abc1234567890poj98764532' }] as UrlSegment[];
      const resultGuard = TestBed.runInInjectionContext(() => updatePersonGuard(ROUTE, segments));
      expect(resultGuard).toBe(true);
    });

    it('should call the method createUrlTree with home redirection', () => {
      const segments = [{ path: 'people' }, { path: 'abc1234567890poj' }] as UrlSegment[];
      TestBed.runInInjectionContext(() => updatePersonGuard(ROUTE, segments));
      expect(ROUTER.createUrlTree).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('#personDetailsResolver', () => {
    it('should return the person details', ({ expect }) => {
      const resultResolver = TestBed.runInInjectionContext(() =>
        personDetailsResolver(ACTIVATED_ROUTER_SNAPSHOT as ActivatedRouteSnapshot, {} as any),
      ) as Observable<People>;

      resultResolver.subscribe(person => expect(person).toEqual(PERSON));
    });
  });
});
