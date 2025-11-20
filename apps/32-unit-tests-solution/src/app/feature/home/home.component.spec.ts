import { DebugElement, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { HomeComponent } from './home.component';

const PERSON: People = {
  id: '1',
  photo: 'sfeir.png',
} as People;

const PEOPLE_SERVICE = {
  getRandomPeople: vi.fn(() => ({
    hasValue: signal(true),
    value: signal(PERSON),
    reload: vi.fn(),
  })),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let container: Element;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture, container: renderedElement } = await render(HomeComponent, {
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    container = renderedElement;
    debugElement = fixture.debugElement;
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
  test('should call the getRandomPerson', () => {
    const spy = vi.spyOn(component, 'getRandomPerson');
    const customEvent = new CustomEvent('personDelete');
    const sfeirCard: HTMLElement = debugElement.query(By.css('sfeir-card')).nativeElement;
    fireEvent(sfeirCard, customEvent);
    expect(spy).toHaveBeenCalled();
  });
});
