import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture } = await render(AppComponent, { schemas: [CUSTOM_ELEMENTS_SCHEMA] });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  test('should create an instance of AppComponent', () => {
    expect(component).toBeInstanceOf(AppComponent);
  });
  test('should contain a toolbar', () => {
    const toolbar = debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });
  test('should the toolbar contain an image', () => {
    const toolbar = debugElement.query(By.css('mat-toolbar'));
    const img = toolbar.query(By.css('img'));
    expect(img).toBeTruthy();
  });
  test('should the toolbar contain a link for maps and a link for list', () => {
    const toolbar = debugElement.query(By.css('mat-toolbar'));
    const links = toolbar.queryAll(By.css('a'));
    const [, mapLink, listLink] = links;
    expect(links.length).toBe(3);
    expect(mapLink.nativeElement.textContent).toBe('Maps');
    expect(listLink.nativeElement.textContent).toBe('List');
  });
  test('should contain a card', () => {
    const card = debugElement.query(By.css('mat-card'));
    expect(card).toBeTruthy();
  });
  test('should contain the name of SFEIR in the card', () => {
    const card: HTMLElement = debugElement.query(By.css('mat-card')).nativeElement;
    expect(card.textContent?.includes('SFEIR')).toBeTruthy();
  });
});
