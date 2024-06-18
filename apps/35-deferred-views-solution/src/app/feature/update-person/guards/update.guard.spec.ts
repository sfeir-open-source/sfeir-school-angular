import { Component, Injector, runInInjectionContext } from '@angular/core';
import { render } from '@testing-library/angular';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { updateGuard } from './update.guard';

const ROUTER = {
  createUrlTree: jest.fn(),
};

@Component({
  template: ``,
})
class ContainerProviderComponent {}

describe('UpdateGuard', () => {
  let router: Router;
  let injector: Injector;
  beforeEach(async () => {
    await render(ContainerProviderComponent, { providers: [{ provide: Router, useValue: ROUTER }] });
    router = TestBed.inject(Router);
    injector = TestBed.inject(Injector);
  });
  test('should create an instance of Router', () => {
    expect(router).toEqual(ROUTER);
  });
  test('should call the createUrlTree method if the id is not correct', () => {
    const activatedSnapshot = { paramMap: new Map([['id', '12']]) };
    const spy = jest.spyOn(router, 'createUrlTree');
    runInInjectionContext(injector, () => {
      return updateGuard(activatedSnapshot as any);
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(['home']);
  });
  test('should authorize the navigation if the is is correct', () => {
    const activatedSnapshot = { paramMap: new Map([['id', '5763cd4d9d2a4f259b53c901']]) };
    const result = runInInjectionContext(injector, () => {
      return updateGuard(activatedSnapshot as any);
    });
    expect(result).toEqual(true);
  });
});
