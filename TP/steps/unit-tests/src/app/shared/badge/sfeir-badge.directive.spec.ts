import { Component, ElementRef } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfeirBadgeDirective } from './sfeir-badge.directive';

export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

export class MockRenderer {
  setElementProperty() {}
}

@Component({
  selector: 'test-badge-directive',
  template: ``
})
export class HostComponentForBadgeDirective {
  person = {};
}

// const MANAGER_BADGE_HTML = '<i class="material-icons">supervisor_account</i>';

describe('SfeirBadgeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponentForBadgeDirective, SfeirBadgeDirective]
    });
  });

  it('should create an instance of sfeir-badge', () => {
    const fixture = createTestComponent('<div sfeir-badge></div>');
    console.log(fixture);
    expect(true).toBe(false);
  });

  it('should not add badge icon when isManager === false', () => {
    // todo
    expect(true).toBe(false);
  });

  it('should add badge icon when isManager === true', () => {
    // todo
    expect(true).toBe(false);
  });
});

function createTestComponent(template: string): ComponentFixture<HostComponentForBadgeDirective> {
  return TestBed.overrideComponent(HostComponentForBadgeDirective, { set: { template } }).createComponent(
    HostComponentForBadgeDirective
  );
}
