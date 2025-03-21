import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { of } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { HomeComponent } from './home.component';
import { PeopleService } from '../../core/providers/people.service';

const PEOPLE_SERVICE_STUB = {
  getPeople: jest.fn(() => of(PEOPLE)),
  getRandomPeople: jest.fn(() => of(PERSON)),
};

const PERSON: People = {
  id: '1',
} as People;

const PEOPLE = [PERSON];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let container: Element;
  let debugElement: DebugElement;
  let componentFixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const { fixture, container: renderedElement } = await render(HomeComponent, {
      imports: [CommonModule],
      declarations: [CardComponent, NaPipe],
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE_STUB }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    container = renderedElement;
    debugElement = fixture.debugElement;
    componentFixture = fixture;
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
    expect(sfeirCard.person).toEqual(PERSON);
  });
  test('should call the getRandomPerson when random button is clicked', () => {
    const button = container.querySelector('button');
    const spy = jest.spyOn(component, 'getRandomPerson');
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test('should call the getRandomPerson when event personDelete is called', () => {
    const customEvent = new CustomEvent('personDelete');
    const spy = jest.spyOn(component, 'getRandomPerson');
    const sfeirCard: HTMLElement = debugElement.query(By.css('sfeir-card')).nativeElement;
    fireEvent(sfeirCard, customEvent);
    expect(component.getRandomPerson).toHaveBeenCalled();
  });
  test('should change the person', fakeAsync(async () => {
    const RANDOM_PERSON = { id: '2' } as People;
    PEOPLE_SERVICE_STUB.getRandomPeople.mockReturnValue(of(RANDOM_PERSON));
    component.getRandomPerson();
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    const sfeirCard: CardComponent = debugElement.query(By.css('sfeir-card')).componentInstance;
    expect(sfeirCard.person).toEqual(RANDOM_PERSON);
  }));
});
