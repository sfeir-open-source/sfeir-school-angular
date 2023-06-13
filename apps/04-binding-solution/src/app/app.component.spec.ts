import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

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
  test('should call the sfeir home component', () => {
    const sfeirHome = debugElement.query(By.css('sfeir-home'));
    expect(sfeirHome).toBeTruthy();
  });
});
