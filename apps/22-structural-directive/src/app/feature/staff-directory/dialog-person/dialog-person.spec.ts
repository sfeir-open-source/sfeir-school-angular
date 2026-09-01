import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { UpsertPersonBody } from '@sfeir/types';
import { SignalForm } from '@sfeir/ui/signal-form';
import { render } from '@testing-library/angular';
import { DialogPerson } from './dialog-person';

const STUB_MAT_DIALOG_REF = {
  close: vi.fn(),
} satisfies Partial<MatDialogRef<DialogPerson, UpsertPersonBody | undefined>>;

const PERSON_BODY: UpsertPersonBody = {
  photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@sfeir.com',
  phone: '0102030405',
};

describe('DialogPerson', () => {
  let fixture: ComponentFixture<DialogPerson>;
  let component: DialogPerson;
  let debugElement: DebugElement;

  beforeEach(async () => {
    STUB_MAT_DIALOG_REF.close.mockClear();
    const { fixture: fixtureFromRender, debugElement: debugElementFromRender } = await render(DialogPerson, {
      providers: [{ provide: MatDialogRef, useValue: STUB_MAT_DIALOG_REF }],
    });
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
    debugElement = debugElementFromRender;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of the DialogPerson component', () => {
      expect(component).toBeInstanceOf(DialogPerson);
    });
  });

  describe('Template', () => {
    it('should call closeDialog with the form value when the submitForm event is triggered', async () => {
      const spy = vi.spyOn(component, 'closeDialog');
      const signalFormComponent = debugElement.query(By.directive(SignalForm));
      signalFormComponent.triggerEventHandler('submitForm', PERSON_BODY);
      await fixture.whenStable();
      expect(spy).toHaveBeenCalledExactlyOnceWith(PERSON_BODY);
      expect(STUB_MAT_DIALOG_REF.close).toHaveBeenCalledExactlyOnceWith(PERSON_BODY);
    });
    it('should call closeDialog with no value when the cancelForm event is triggered', async () => {
      const spy = vi.spyOn(component, 'closeDialog');
      const signalFormComponent = debugElement.query(By.directive(SignalForm));
      signalFormComponent.triggerEventHandler('cancelForm');
      await fixture.whenStable();
      expect(spy).toHaveBeenCalledExactlyOnceWith();
      expect(STUB_MAT_DIALOG_REF.close).toHaveBeenCalledExactlyOnceWith(undefined);
    });
  });
});
