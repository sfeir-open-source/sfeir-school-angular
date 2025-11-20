import { TestBed } from '@angular/core/testing';
import { Router, type UrlSegment } from '@angular/router';
import { vi } from 'vitest';
import { updatePersonGuard } from './main-routing-guard';

const ROUTER = {
  createUrlTree: vi.fn(),
};

const ROUTE = {};

describe('MainRouterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: ROUTER }],
    });
  });

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
