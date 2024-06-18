import { HttpRequest } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { People } from '../../shared/models/people.model';

const HTTP_REQUEST = new HttpRequest<People | Array<People>>('GET', 'https://swapi.dev/api/people/1/');
const NEXT = jest.fn();

describe('AuthorizationInterceptor', () => {
  test('should call the methode cloneRequest', () => {
    const spy = jest.spyOn(HTTP_REQUEST, 'clone');
    AuthorizationInterceptor(HTTP_REQUEST, NEXT);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ setHeaders: { Authorization: 'Sfeir' } });
  });
  test('should call the next function with the clone request', () => {
    const clonedRequest = HTTP_REQUEST.clone({ setHeaders: { Authorization: 'Sfeir' } });
    AuthorizationInterceptor(HTTP_REQUEST, NEXT);
    expect(NEXT).toHaveBeenCalledWith(clonedRequest);
  });
});
