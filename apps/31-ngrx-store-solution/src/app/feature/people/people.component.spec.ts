import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { fireEvent, render, screen } from '@testing-library/angular';
import { EMPTY, of } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { PeopleComponent } from './people.component';

const PEOPLE_SERVICE = {
  getPeople: vi.fn(),
  deletePeople: vi.fn(),
  addNewPerson: vi.fn(() => of(null)),
};

const PEOPLE = [
  { id: '1', photo: 'sfeir.png' },
  { id: '2', photo: 'sfeir.png' },
] as Array<People>;

const MAT_DIALOG = {
  open: vi.fn(),
};

const APP_STORE = {
  dispatch: vi.fn(),
  select: vi.fn(() => of(PEOPLE)),
};

describe('PeopleComponent', () => {
  let componentFixture: ComponentFixture<PeopleComponent>;
  let component: PeopleComponent;
  let container: Element;
  let debugElement: DebugElement;

  beforeAll(() => {
    vi.spyOn(PEOPLE_SERVICE, 'getPeople').mockReturnValue(of(PEOPLE));
  });
  beforeEach(async () => {
    const { fixture, container: rendererResult } = await render(PeopleComponent, {
      imports: [CommonModule],
      declarations: [CardComponent, NaPipe],
      providers: [
        { provide: PeopleService, useValue: PEOPLE_SERVICE },
        { provide: MatDialog, useValue: MAT_DIALOG },
        { provide: Store, useValue: APP_STORE },
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
      const spy = vi.spyOn(component, 'changeView');
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
      vi.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE.at(1)]));
      const sfeirCard = container.querySelectorAll('sfeir-card').item(0);
      const customEvent = new CustomEvent('personDelete', { detail: PEOPLE[0] });
      const spy = vi.spyOn(component, 'deletePerson');
      fireEvent(sfeirCard, customEvent);
      expect(spy).toHaveBeenCalled();
    });
    test('should set the search to filter', () => {
      const spy = vi.spyOn(component, 'filterPeopleBySearch');
      const customEvent = new CustomEvent('search', { detail: 'test' });
      const searchBar = container.querySelector('sfeir-search-bar');
      fireEvent(searchBar, customEvent);
      expect(spy).toHaveBeenCalled();
      expect(APP_STORE.dispatch).toHaveBeenCalled();
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
      vi.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => EMPTY } as any);
      const spy = vi.spyOn(component, 'showDialog');
      const button = screen.getByTestId('button-modal');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the open method of the dialog service', () => {
      vi.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => EMPTY } as any);
      const spy = vi.spyOn(MAT_DIALOG, 'open');
      component.showDialog();
      expect(spy).toHaveBeenCalledWith(AddPersonDialogComponent, { width: '50%', height: 'fit-content' });
    });
    test('should call the addNewPerson method', async () => {
      vi.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      await componentFixture.whenStable();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalled();
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalledWith(PEOPLE[0]);
    });
    test('should refresh the list', async () => {
      vi.spyOn(MAT_DIALOG, 'open').mockReturnValue({ afterClosed: () => of(PEOPLE[0]) } as any);
      component.showDialog();
      await componentFixture.whenStable();
      expect(PEOPLE_SERVICE.getPeople).toHaveBeenCalled();
    });
  });
});
