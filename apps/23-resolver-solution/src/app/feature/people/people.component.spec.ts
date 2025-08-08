import { CommonModule } from '@angular/common';
import { ApplicationRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { EMPTY, of } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { PeopleComponent } from './people.component';
import { PeopleService } from '../../core/providers/people.service';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const PEOPLE_SERVICE = {
  getPeople: jest.fn(),
  deletePeople: jest.fn(),
  addNewPerson: jest.fn(() => of(null)),
};

const PEOPLE = [
  { id: '1', photo: 'sfeir.png' },
  { id: '2', photo: 'sfeir.png' },
] as Array<People>;

const MAT_DIALOG = {
  open: jest.fn(),
};

describe('PeopleComponent', () => {
  let componentFixture: ComponentFixture<PeopleComponent>;
  let component: PeopleComponent;
  let container: Element;
  let debugElement: DebugElement;
  let applicationRef: ApplicationRef;

  beforeAll(() => {
    jest.spyOn(PEOPLE_SERVICE, 'getPeople').mockReturnValue(of(PEOPLE));
  });
  beforeEach(async () => {
    const { fixture, container: rendererResult } = await render(PeopleComponent, {
      imports: [CommonModule],
      declarations: [CardComponent, NaPipe],
      providers: [
        { provide: PeopleService, useValue: PEOPLE_SERVICE },
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
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
    });
    test('should alternate the view between card and list', () => {
      component.changeView();
      expect(component.view()).toEqual('list');
      component.changeView();
      expect(component.view()).toEqual('card');
    });
  });

  describe('#card-view-mode', () => {
    test('should display the card list', () => {
      const cardList = screen.getAllByTestId('card-view');
      expect(cardList).toBeTruthy();
    });
    test('should display two sfeir-card', () => {
      const sfeirCards = container.querySelectorAll('sfeir-card');
      expect(sfeirCards.length).toEqual(2);
    });
    test('should pass the correct person', () => {
      const [sfeirCard1, sfeirCard2] = debugElement.queryAll(By.directive(CardComponent));
      expect(sfeirCard1.componentInstance.person()).toEqual(PEOPLE[0]);
      expect(sfeirCard2.componentInstance.person()).toEqual(PEOPLE[1]);
    });
    test('should call the delete method', () => {
      jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE.at(1)]));
      const sfeirCard = container.querySelectorAll('sfeir-card').item(0);
      const customEvent = new CustomEvent('personDelete', { detail: PEOPLE[0] });
      const spy = jest.spyOn(component, 'deletePerson');
      fireEvent(sfeirCard, customEvent);
      expect(spy).toHaveBeenCalled();
    });
    test('should delete the person', async () => {
      jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE.at(1)]));
      component.deletePerson(PEOPLE.at(0));
      await componentFixture.whenStable();
      componentFixture.detectChanges();
      const sfeirCards = container.querySelectorAll('sfeir-card');
      expect(sfeirCards.length).toEqual(1);
    });
  });
  describe('#list-view-mode', () => {
    beforeEach(() => {
      component.changeView();
      componentFixture.detectChanges();
    });
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
      expect(spy).toHaveBeenCalledWith(AddPersonDialogComponent, { width: '50%', height: 'fit-content' });
    });
    test('should call the addNewPerson method', async () => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      await componentFixture.whenStable();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalled();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalledWith(PEOPLE[0]);
    });
    test('should refresh the list', async () => {
      jest.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      await componentFixture.whenStable();
      expect(PEOPLE_SERVICE.getPeople).toHaveBeenCalled();
    });
  });
});
