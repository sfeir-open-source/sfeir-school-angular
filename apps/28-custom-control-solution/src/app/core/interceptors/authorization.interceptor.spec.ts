import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { HttpRequest } from '@angular/common/http';
import { EMPTY, withLatestFrom } from 'rxjs';
import { People } from '../../shared/models/people.model';

const REQUEST = new HttpRequest<People | Array<People>>('GET', 'https://swapi.dev/api/people/1/');
const NEXT = {
  handle: jest.fn(() => EMPTY),
};

@Component({ template: '' })
class ContainerProviderComponent {}

describe('AuthorizationInterceptor', () => {
  let interceptor: AuthorizationInterceptor;

  beforeEach(async () => {
    await render(ContainerProviderComponent, {
      providers: [AuthorizationInterceptor],
    });
    interceptor = TestBed.inject(AuthorizationInterceptor);
  });

  test('should create an instance of the interceptor', () => {
    expect(interceptor).toBeInstanceOf(AuthorizationInterceptor);
  });
  test('should call the method clone of the request', async () => {
    const spy = jest.spyOn(REQUEST, 'clone');
    await withLatestFrom(interceptor.intercept(REQUEST, NEXT));
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ setHeaders: { Authorization: 'Sfeir' } });
  });
  test('should call the method handle of the httpHandler', async () => {
    const requestUpdate = REQUEST.clone({ setHeaders: { Authorization: 'Sfeir' } });
    const spy = jest.spyOn(NEXT, 'handle');
    await withLatestFrom(interceptor.intercept(REQUEST, NEXT));
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(requestUpdate);
  });
});
