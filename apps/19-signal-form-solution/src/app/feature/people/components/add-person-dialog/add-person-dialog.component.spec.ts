import { AddPersonDialogComponent } from './add-person-dialog.component';
import { fireEvent, render } from '@testing-library/angular';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PeopleForm } from '../../../../shared/models/people.model';
import { vi } from 'vitest';

const DIALOG_REF = {
  close: vi.fn(),
};

describe('AddPersonDialogComponent', () => {
  let component: AddPersonDialogComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(AddPersonDialogComponent, {
      providers: [{ provide: MatDialogRef, useValue: DIALOG_REF }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    container = hostContainer;
  });

  it('should create an instance of AddPersonDialogComponent', () => {
    expect(component).toBeInstanceOf(AddPersonDialogComponent);
  });
  it('should call the method closeDialog when cancel event is emit', () => {
    const cancelEvent = new CustomEvent('cancel');
    const spy = vi.spyOn(component, 'closeDialog');
    const sfeirForm = container.querySelector('sfeir-form');
    fireEvent(sfeirForm, cancelEvent);
    expect(spy).toHaveBeenCalled();
  });
  it('should call the method closeDialog when save event is emit', () => {
    const cancelEvent = new CustomEvent('save');
    const spy = vi.spyOn(component, 'closeDialog');
    const sfeirForm = container.querySelector('sfeir-form');
    fireEvent(sfeirForm, cancelEvent);
    expect(spy).toHaveBeenCalled();
  });
  it('should call the close method of the dialogRef', () => {
    component.closeDialog();
    expect(DIALOG_REF.close).toHaveBeenCalledWith(null);
  });
  it('should close the dialog with a person', () => {
    const person = { firstname: 'toto' } as PeopleForm;
    component.closeDialog(person);
    expect(DIALOG_REF.close).toHaveBeenCalledWith(person);
  });
});
