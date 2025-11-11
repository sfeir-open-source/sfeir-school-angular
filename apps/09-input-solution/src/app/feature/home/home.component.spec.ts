import { provideHttpClient } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { HomeComponent } from './home.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

const PERSON: People = {
  id: '1',
  photo: 'sfeir.png',
} as People;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let container: Element;
  let debugElement: DebugElement;
  let componentFixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const { fixture, container: renderedElement } = await render(HomeComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    container = renderedElement;
    debugElement = fixture.debugElement;
    componentFixture = fixture;
  });

  beforeEach(async () => {
    componentFixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne('http://localhost:9000/api/peoples/random').flush(PERSON);
    await componentFixture.whenStable();
    componentFixture.detectChanges();
  });

  test('should create an instance of HomeComponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });
  test('should display the component sfeir-card', () => {
    const sfeirCard = container.querySelector('sfeir-card');
    expect(sfeirCard).toBeTruthy();
  });
  test('should pass the input person', () => {
    const sfeirCard: CardComponent = debugElement.query(By.css('sfeir-card')).componentInstance;
    expect(sfeirCard.person()).toEqual(PERSON);
  });
  test('should call the getRandomPerson', () => {
    const spy = vi.spyOn(component, 'getRandomPerson');
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
