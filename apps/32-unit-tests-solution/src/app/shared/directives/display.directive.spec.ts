/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisplayDirective } from './display.directive';

@Component({
  template: ``,
})
export class HostSfeirDisplayDirective {
  condition = true;
}

const overrideTemplateComponent = (template: string) =>
  TestBed.overrideComponent(HostSfeirDisplayDirective, { set: { template } }).createComponent(HostSfeirDisplayDirective);

describe('SfeirDisplayDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostSfeirDisplayDirective, DisplayDirective],
    }).compileComponents();
  }));

  it('should create an instante of HostSfeirDisplayDirective', () => {
    const fixture = overrideTemplateComponent(`<div>Hello</div>`);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display the div if condition is false', () => {
    const fixture = overrideTemplateComponent(`<div *sfeirDisplay="false">Hello</div>`);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const divElement = debugElement.query(By.css('div'));
    expect(divElement).toBeFalsy();
  });

  it('should display the div if condition is true', () => {
    const fixture = overrideTemplateComponent(`<div *sfeirDisplay="true">Hello</div>`);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const divElement = debugElement.query(By.css('div'));
    expect(divElement).toBeTruthy();
  });

  it('should reevaluate the condition if change', () => {
    const fixture = overrideTemplateComponent(`<div *sfeirDisplay="condition">Hello</div>`);
    const debugElement = fixture.debugElement;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    let divElement = debugElement.query(By.css('div'));
    expect(divElement).toBeTruthy();
    component.condition = false;
    fixture.detectChanges();
    divElement = debugElement.query(By.css('div'));
    expect(divElement).toBeFalsy();
  });
});
