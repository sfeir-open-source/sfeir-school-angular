import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { PeopleComponent } from './people.component';
import { PeopleService } from '../../core/providers/people.service';
import { BadgeDirective } from '../../shared/directives/badge.directive';

const PEOPLE_SERVICE = {
  getPeople: jest.fn(),
  deletePeople: jest.fn(),
};

const PEOPLE = [{ id: '1' }, { id: '2' }] as Array<People>;

describe('PeopleComponent', () => {
  let componentFixture: ComponentFixture<PeopleComponent>;
  let component: PeopleComponent;
  let container: Element;
  let debugElement: DebugElement;

  beforeAll(() => {
    jest.spyOn(PEOPLE_SERVICE, 'getPeople').mockReturnValue(of(PEOPLE));
  });
  beforeEach(async () => {
    const { fixture, container: rendererResult } = await render(PeopleComponent, {
      imports: [CommonModule],
      declarations: [CardComponent, NaPipe, BadgeDirective],
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = rendererResult;
    debugElement = fixture.debugElement;
  });

  describe('#basics', () => {
    test('should create an instance of PeopleComponent', () => {
      expect(component).toBeInstanceOf(PeopleComponent);
    });
    test('should call the changeView method', () => {
      const spy = jest.spyOn(component, 'changeView');
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('card');
    });
    test('should change the view to list', fakeAsync(() => {
      let view = null;
      component.view$.subscribe(v => (view = v));
      component.changeView('card');
      tick();
      expect(view).toEqual('list');
    }));
    test('should change the view to card', fakeAsync(() => {
      let view = null;
      component.view$.subscribe(v => (view = v));
      component.changeView('list');
      tick();
      expect(view).toEqual('card');
    }));
  });

  describe('#card-view-mode', () => {
    test('should display the card list', () => {
      const cardList = screen.getByTestId('card-view');
      expect(cardList).toBeTruthy();
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
      jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE.at(1)]));
      const sfeirCard = container.querySelectorAll('sfeir-card').item(0);
      const customEvent = new CustomEvent('personDelete', { detail: PEOPLE[0] });
      const spy = jest.spyOn(component, 'deletePerson');
      fireEvent(sfeirCard, customEvent);
      expect(spy).toHaveBeenCalled();
    });
    test('should delete the person', fakeAsync(async () => {
      jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE.at(1)]));
      component.deletePerson(PEOPLE.at(0));
      tick();
      await componentFixture.whenStable();
      componentFixture.detectChanges();
      const sfeirCards = container.querySelectorAll('sfeir-card');
      expect(sfeirCards.length).toEqual(1);
    }));
  });
  describe('#list-view-mode', () => {
    beforeEach(fakeAsync(() => {
      component.changeView('card');
      tick();
      componentFixture.detectChanges();
    }));
    test('should display the item list', () => {
      const itemList = screen.getByTestId('list-view');
      expect(itemList).toBeTruthy();
    });
  });
});
