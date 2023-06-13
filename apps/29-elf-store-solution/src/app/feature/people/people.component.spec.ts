import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { EMPTY, of } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { AppStoreService } from '../../core/store/app.store';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeDirective } from '../../shared/directives/badge.directive';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { PeopleComponent } from './people.component';

const PEOPLE_SERVICE = {
  getPeople: jest.fn(),
  deletePeople: jest.fn(),
  addNewPerson: jest.fn(() => of(null)),
};

const STORE_SERVICE = {
  selectPeople: jest.fn(() => of(PEOPLE)),
  selectSearch: jest.fn(() => of('')),
  setSearch: jest.fn(),
};

const PEOPLE = [{ id: '1' }, { id: '2' }] as Array<People>;

const MAT_DIALOG = {
  open: jest.fn(),
};

describe('PeopleComponent', () => {
  let componentFixture: ComponentFixture<PeopleComponent>;
  let component: PeopleComponent;
  let container: Element;
  let debugElement: DebugElement;

  beforeAll(() => {
    jest.spyOn(PEOPLE_SERVICE, 'getPeople').mockReturnValue(EMPTY);
  });
  beforeEach(async () => {
    const { fixture, container: rendererResult } = await render(PeopleComponent, {
      imports: [CommonModule, MatDialogModule],
      declarations: [CardComponent, NaPipe, BadgeDirective, AddPersonDialogComponent, SearchComponent],
      providers: [
        { provide: PeopleService, useValue: PEOPLE_SERVICE },
        { provide: AppStoreService, useValue: STORE_SERVICE },
        { provide: MatDialog, useValue: MAT_DIALOG },
      ],
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
      const button = screen.getByTestId('button-view');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('card');
    });
    test('should change the view to list', fakeAsync(() => {
      let view = null;
      component.view$.subscribe(v => (view = v));
      component.changeView(view);
      tick();
      expect(view).toEqual('list');
    }));
    test('should change the view to list', fakeAsync(() => {
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
    test('should delete the person', () => {
      const spy = jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(EMPTY);
      component.deletePerson(PEOPLE.at(0));
      expect(spy).toHaveBeenCalledWith('1');
    });
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
  describe('#dialog', () => {
    test('should open the dialog', () => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => EMPTY } as any);
      const spy = jest.spyOn(component, 'showDialog');
      const button = screen.getByTestId('button-modal');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the open method of the dialog service', () => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => EMPTY } as any);
      const spy = jest.spyOn(MAT_DIALOG, 'open');
      component.showDialog();
      expect(spy).toHaveBeenCalledWith(AddPersonDialogComponent, { width: '30%', height: 'fit-content' });
    });
    test('should call the addNewPerson method', fakeAsync(() => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      flush();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalled();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalledWith(PEOPLE[0]);
    }));
    test('should refresh the list', fakeAsync(() => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      flush();
      expect(PEOPLE_SERVICE.getPeople).toHaveBeenCalled();
    }));
    test('should call the method search', () => {
      const spy = jest.spyOn(component, 'setSearch');
      const search = container.querySelector('sfeir-search');
      const customEvent = new CustomEvent('search', { detail: 'test' });
      fireEvent(search, customEvent);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the method setSearch', () => {
      const spy = jest.spyOn(STORE_SERVICE, 'setSearch');
      component.setSearch('test');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('test');
    });
  });
});
