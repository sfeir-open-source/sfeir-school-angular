import { BrowserModule, By } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SfeirBadgeDirective } from './sfeir-badge.directive';
import { ElementRef, Component, Renderer2 } from '@angular/core';

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

const MANAGER_BADGE_HTML = '<i class="material-icons">supervisor_account</i>';

describe('SfeirBadgeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponentForBadgeDirective, SfeirBadgeDirective]
    });
  });

  it('should create an instance of sfeir-badge', () => {
    const fixture = createTestComponent('<div sfeir-badge></div>');
    expect(fixture).toBeDefined();
  });

  it('should not add badge icon when isManager === false', () => {
    const fixture = createTestComponent('<div sfeir-badge [person]="person"></div>');
    fixture.componentInstance.person = { isManager: false };
    fixture.detectChanges();
    const divElement = fixture.nativeElement.querySelector('div');
    expect(divElement.innerHTML).toBe('');
  });

  it('should add badge icon when isManager === true', () => {
    const fixture = createTestComponent('<div sfeir-badge [person]="person"></div>');
    fixture.componentInstance.person = { isManager: true };
    fixture.detectChanges();
    const divElement = fixture.nativeElement.querySelector('div');
    expect(divElement.innerHTML).toBe(MANAGER_BADGE_HTML);
  });
});

function createTestComponent(template: string): ComponentFixture<HostComponentForBadgeDirective> {
  return TestBed.overrideComponent(HostComponentForBadgeDirective, { set: { template } }).createComponent(
    HostComponentForBadgeDirective
  );
}
