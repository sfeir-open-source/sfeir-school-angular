/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeDirective } from './badge.directive';

@Component({
  template: '',
})
export class HostBadgeDirective {
  @ViewChild(BadgeDirective) badgeDirective: BadgeDirective;
}

const overrideTemplate = (template: string) =>
  TestBed.overrideComponent(HostBadgeDirective, { set: { template } }).createComponent(HostBadgeDirective);

describe('BadgeDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostBadgeDirective, BadgeDirective],
    });
  }));

  it('should create an instance', () => {
    const fixture = overrideTemplate('<span [sfeirBadge]="true"></span>');
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should not display the icon for a non manager person', () => {
    /**TODO:
     * check that the icon is not display if the person is not a manager
     */
  });

  it('should display the icon if person is manager', () => {
    /**TODO:
     * check that the icon is display if the person is manager
     */
  });

  it('by default the icon color must be black', () => {
    const fixture = overrideTemplate('<span [sfeirBadge]="true"></span>');
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const spanElement = debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.style.color).toBe('black');
  });

  it('should call the onMouseOver listener when mouseover event is dispatched', () => {
    const fixture = overrideTemplate('<span [sfeirBadge]="true"></span>');
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const spyOnMouseOver = jest.spyOn(component.badgeDirective, 'onMouseOver');
    const mouseOverEvent = new Event('mouseover');
    let spanElement = debugElement.query(By.css('span'));
    spanElement.triggerEventHandler('mouseover', mouseOverEvent);
    fixture.detectChanges();
    spanElement = debugElement.query(By.css('span'));
    expect(spyOnMouseOver).toHaveBeenCalledTimes(1);
    expect(spanElement.nativeElement.style.color).toBe('red');
  });

  it('should call the onMouseOut listener when mouseout event is dispatched', () => {
    const fixture = overrideTemplate('<span [sfeirBadge]="true"></span>');
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const spyOnMouseLeave = jest.spyOn(component.badgeDirective, 'onMouseOut');
    const mouseLeaveEvent = new Event('mouseout');
    let spanElement = debugElement.query(By.css('span'));
    spanElement.triggerEventHandler('mouseout', mouseLeaveEvent);
    fixture.detectChanges();
    spanElement = debugElement.query(By.css('span'));
    expect(spyOnMouseLeave).toHaveBeenCalledTimes(1);
    expect(spanElement.nativeElement.style.color).toBe('black');
  });

  it('should alterne color black red function if user dispatch mouseover or mouseout event', () => {
    const fixture = overrideTemplate('<span [sfeirBadge]="true"></span>');
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    let spanElement = debugElement.query(By.css('span'));
    const mouseOverEvent = new Event('mouseover');
    spanElement.triggerEventHandler('mouseover', mouseOverEvent);
    fixture.detectChanges();
    expect(spanElement.nativeElement.style.color).toBe('red');
    const mouseLeaveEvent = new Event('mouseout');
    spanElement.triggerEventHandler('mouseout', mouseLeaveEvent);
    fixture.detectChanges();
    spanElement = debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.style.color).toBe('black');
  });
});
