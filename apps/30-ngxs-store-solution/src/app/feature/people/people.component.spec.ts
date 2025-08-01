import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideStore } from '@ngxs/store';
import { fireEvent, render, screen } from '@testing-library/angular';
import { EMPTY, of } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { AppStore } from '../../core/store/app-store';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { PeopleComponent } from './people.component';

const PEOPLE_SERVICE = {
  getPeople: jest.fn(),
  deletePeople: jest.fn(),
  addNewPerson: jest.fn(() => of(null)),
};

const PEOPLE = [
  { id: '1', firstname: 'John', lastname: 'Doe', photo: 'sfeir.png', isManager: true, entity: 'IT', email: 'john@example.com' },
  { id: '2', firstname: 'Jane', lastname: 'Smith', photo: 'sfeir.png', isManager: false, entity: 'HR', email: 'jane@example.com' },
] as Array<People>;

const MAT_DIALOG = {
  open: jest.fn(),
};

const DISPATCHED_ACTION = jest.fn(() => void 0);

jest.mock('@ngxs/store', () => {
  const library = jest.requireActual('@ngxs/store');
  return {
    ...library,
    select: jest.fn(() => signal(PEOPLE)),
    dispatch: jest.fn(() => DISPATCHED_ACTION),
  };
});

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
      declarations: [CardComponent, NaPipe],
      providers: [
        { provide: PeopleService, useValue: PEOPLE_SERVICE },
        {
          provide: MatDialog,
          useValue: MAT_DIALOG,
        },
        provideStore([AppStore]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = rendererResult;
    debugElement = fixture.debugElement;
    componentFixture.detectChanges();
  });
  afterEach(() => {
    jest.clearAllMocks();
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
      expect(cardList.length).toBeGreaterThan(0);
    });

    test('should display two sfeir-card', () => {
      const sfeirCards = container.querySelectorAll('sfeir-card');
      expect(sfeirCards.length).toEqual(2);
    });

    test('should pass the correct person', () => {
      const sfeirCards = debugElement.queryAll(By.directive(CardComponent));
      expect(sfeirCards.length).toEqual(2);
      expect(sfeirCards[0].componentInstance.person()).toEqual(PEOPLE[0]);
      expect(sfeirCards[1].componentInstance.person()).toEqual(PEOPLE[1]);
    });

    test('should call the delete method', () => {
      jest.spyOn(PEOPLE_SERVICE, 'deletePeople').mockReturnValue(of([PEOPLE[1]]));
      const sfeirCards = container.querySelectorAll('sfeir-card');
      expect(sfeirCards.length).toEqual(2);
      const spy = jest.spyOn(component, 'deletePerson');
      component.deletePerson(PEOPLE[0]);
      expect(spy).toHaveBeenCalledWith(PEOPLE[0]);
    });

    test('should set the search to filter', () => {
      const spy = jest.spyOn(component, 'filterPeopleBySearch');
      const customEvent = new CustomEvent('search', { detail: 'test' });
      const searchInput = container.querySelector('sfeir-search-bar');
      fireEvent(searchInput, customEvent);
      expect(spy).toHaveBeenCalled();
      expect(DISPATCHED_ACTION).toHaveBeenCalled();
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
