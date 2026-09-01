import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WINDOW } from '../provider/window';
import { TokenInterceptor } from './token-interceptor';

describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let sessionStorageStub: { getItem: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionStorageStub = { getItem: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([TokenInterceptor])),
        provideHttpClientTesting(),
        { provide: WINDOW, useValue: { sessionStorage: sessionStorageStub } },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should read the Authorization key from sessionStorage', () => {
    sessionStorageStub.getItem.mockReturnValue('john.doe');
    http.get('/people').subscribe();
    httpMock.expectOne('/people');
    expect(sessionStorageStub.getItem).toHaveBeenCalledExactlyOnceWith('Authorization');
  });

  it('should add the token as a Bearer Authorization header when a token is stored', () => {
    sessionStorageStub.getItem.mockReturnValue('john.doe');
    http.get('/people').subscribe();
    const req = httpMock.expectOne('/people');
    expect(req.request.headers.get('Authorization')).toBe('Bearer john.doe');
  });

  it('should set a Bearer null Authorization header when no token is stored', () => {
    sessionStorageStub.getItem.mockReturnValue(null);
    http.get('/people').subscribe();
    const req = httpMock.expectOne('/people');
    expect(req.request.headers.get('Authorization')).toBe('Bearer null');
  });
});
