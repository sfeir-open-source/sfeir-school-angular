import { HttpRequest, type HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { TokenInterceptor } from './core-interceptors';

const REQUEST = new HttpRequest<any>('GET', 'https://swapi.dev/api/people/1/');

const NEXT = jest.fn(() => of({} as HttpEvent<any>));

describe('CoreInterceptors', () => {
  describe('#TokenInterceptor', () => {
    it('should clone the request correctly', done => {
      const spy = jest.spyOn(REQUEST, 'clone');
      TokenInterceptor(REQUEST, NEXT).subscribe(() => {
        expect(spy).toHaveBeenCalledWith({ setHeaders: { Authorization: 'Bearer SFEIR' } });
        done();
      });
    });
    it('should call the next function with the cloned request', done => {
      const requestUpdate = REQUEST.clone({ setHeaders: { Authorization: 'Bearer SFEIR' } });
      TokenInterceptor(REQUEST, NEXT).subscribe(() => {
        expect(NEXT).toHaveBeenCalled();
        expect(NEXT).toHaveBeenCalledWith(requestUpdate);
        done();
      });
    });
  });
});
