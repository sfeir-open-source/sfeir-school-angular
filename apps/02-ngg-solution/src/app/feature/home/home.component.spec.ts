import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HomeComponent } from './home.component';
import { render } from '@testing-library/angular';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture } = await render(HomeComponent, { schemas: [CUSTOM_ELEMENTS_SCHEMA] });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  test('should create an instance of HomeComponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });
  test('should display a mat card', () => {
    const matCard = debugElement.query(By.css('mat-card'));
    expect(matCard).toBeTruthy();
  });
  test('should display the name Sfeir in the card', () => {
    const matCard = debugElement.query(By.css('mat-card'));
    expect(matCard.nativeElement.textContent).toContain('Sfeir');
  });
});
