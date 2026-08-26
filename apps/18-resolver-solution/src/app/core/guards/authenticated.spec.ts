import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { WINDOW } from '../provider/window';
import { authenticatedGuard, notAuthenticatedGuard } from './authenticated';

function runGuard(guard: CanActivateFn) {
  return TestBed.runInInjectionContext(() => guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
}

describe('authenticated guards', () => {
  let sessionStorageStub: { getItem: ReturnType<typeof vi.fn> };
  let createUrlTreeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sessionStorageStub = { getItem: vi.fn() };
    createUrlTreeSpy = vi.fn((commands: unknown[]) => ({ commands }));
    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useValue: { sessionStorage: sessionStorageStub } },
        { provide: Router, useValue: { createUrlTree: createUrlTreeSpy } },
      ],
    });
  });

  describe('authenticatedGuard', () => {
    it('should read the Authorization key from sessionStorage', async () => {
      sessionStorageStub.getItem.mockReturnValue('john.doe');
      await runGuard(authenticatedGuard as CanActivateFn);
      expect(sessionStorageStub.getItem).toHaveBeenCalledExactlyOnceWith('Authorization');
    });
    it('should allow activation when the user is authenticated', () => {
      sessionStorageStub.getItem.mockReturnValue('john.doe');
      const result = runGuard(authenticatedGuard as CanActivateFn);
      expect(result).toBe(true);
      expect(createUrlTreeSpy).not.toHaveBeenCalled();
    });
    it('should redirect to /login when the user is not authenticated', () => {
      sessionStorageStub.getItem.mockReturnValue(null);
      const result = runGuard(authenticatedGuard as CanActivateFn);
      expect(createUrlTreeSpy).toHaveBeenCalledExactlyOnceWith(['/login']);
      expect(result).toEqual({ commands: ['/login'] });
    });
  });

  describe('notAuthenticatedGuard', () => {
    it('should allow activation when the user is not authenticated', () => {
      sessionStorageStub.getItem.mockReturnValue(null);
      const result = runGuard(notAuthenticatedGuard as CanActivateFn);
      expect(result).toBe(true);
      expect(createUrlTreeSpy).not.toHaveBeenCalled();
    });
    it('should redirect to /people when the user is already authenticated', () => {
      sessionStorageStub.getItem.mockReturnValue('john.doe');
      const result = runGuard(notAuthenticatedGuard as CanActivateFn);
      expect(createUrlTreeSpy).toHaveBeenCalledExactlyOnceWith(['/people']);
      expect(result).toEqual({ commands: ['/people'] });
    });
  });
});
