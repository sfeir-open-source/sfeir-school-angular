import { BrowserModule, By } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SfeirBadgeDirective } from './sfeir-badge.directive';
import { ElementRef, Renderer, Component } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

export class MockRenderer {
  setElementProperty(...args) {}
}

@Component({
  selector: 'test-badge-directive',
  template: ``
})
export class HostComponentForBadgeDirective {
  person = {};
}

let MANAGER_BADGE_HTML = '<i class="material-icons">supervisor_account</i>';

describe('SfeirBadgeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponentForBadgeDirective, SfeirBadgeDirective]
    });
  });

  it('should create an instance of sfeir-badge', () => {
    let fixture = createTestComponent('<div sfeir-badge></div>');
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
