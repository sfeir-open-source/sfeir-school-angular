import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { of } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { PeopleComponent } from './people.component';

const HTTP_CLIENT = {
  get: jest.fn(),
  delete: jest.fn(),
};

const PEOPLE = [{ id: '1' }, { id: '2' }] as Array<People>;

describe('PeopleComponent', () => {
  let componentFixture: ComponentFixture<PeopleComponent>;
  let component: PeopleComponent;
  let container: Element;
  let debugElement: DebugElement;

  beforeAll(() => {
    jest.spyOn(HTTP_CLIENT, 'get').mockReturnValue(of(PEOPLE));
  });
  beforeEach(async () => {
    const { fixture, container: rendererResult } = await render(PeopleComponent, {
      imports: [CommonModule],
      declarations: [CardComponent],
      providers: [{ provide: HttpClient, useValue: HTTP_CLIENT }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = rendererResult;
    debugElement = fixture.debugElement;
  });

  test('should create an instance of PeopleComponent', () => {
    expect(component).toBeInstanceOf(PeopleComponent);
  });
  test('should display two sfeir-card', () => {
    const sfeirCards = container.querySelectorAll('sfeir-card');
    expect(sfeirCards.length).toEqual(2);
  });
  test('should pass the correct person', () => {
    const [sfeirCard1, sfeirCard2] = debugElement.queryAll(By.directive(CardComponent));
    expect(sfeirCard1.componentInstance.person).toEqual(PEOPLE[0]);
    expect(sfeirCard2.componentInstance.person).toEqual(PEOPLE[1]);
  });
  test('should call the delete method', () => {
    const sfeirCard = container.querySelectorAll('sfeir-card').item(0);
    const customEvent = new CustomEvent('personDelete', { detail: PEOPLE[0] });
    const spy = jest.spyOn(component, 'deletePerson');
    fireEvent(sfeirCard, customEvent);
    expect(spy).toHaveBeenCalled();
  });
  test('should delete the person', fakeAsync(async () => {
    jest.spyOn(HTTP_CLIENT, 'delete').mockReturnValue(of([PEOPLE.at(1)]));
    component.deletePerson(PEOPLE.at(0));
    tick();
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    const sfeirCards = container.querySelectorAll('sfeir-card');
    expect(sfeirCards.length).toEqual(1);
  }));
});
