import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

@Component({
  template: 'Home Component',
})
class MockHomeComponent {}

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MockHomeComponent },
];

describe('AppComponent', () => {
  let component: AppComponent;
  let debugElement: DebugElement;
  let navigate: any;

  beforeEach(async () => {
    const { fixture, navigate: navigation } = await render(AppComponent, {
      declarations: [MockHomeComponent],
      routes: ROUTES,
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    navigate = navigation;
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
  test('should display the homeComponent', () => {
    const homeComponent = screen.getByText('Home Component');
    expect(homeComponent).toBeTruthy();
  });
});
