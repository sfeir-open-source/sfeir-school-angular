import { TestBed } from '@angular/core/testing';
import { WINDOW } from './window';
import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;
  let sessionStorageStub: { setItem: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionStorageStub = { setItem: vi.fn() };
    TestBed.configureTestingModule({
      providers: [UserService, { provide: WINDOW, useValue: { sessionStorage: sessionStorageStub } }],
    });
    service = TestBed.inject(UserService);
  });

  describe('Instance', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });
    it('should create an instance of UserService', () => {
      expect(service).toBeInstanceOf(UserService);
    });
  });

  describe('login', () => {
    it('should store the given username under the Authorization key in sessionStorage', () => {
      service.login('john.doe');
      expect(sessionStorageStub.setItem).toHaveBeenCalledExactlyOnceWith('Authorization', 'john.doe');
    });
  });
});
