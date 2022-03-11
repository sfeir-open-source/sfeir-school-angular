import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { People } from '../../models/people.model';
import { PersonForm } from './form';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let fixture: ComponentFixture<FormComponent>;
  let component: FormComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance of FormComponent', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create an instance of personForm without existing person', () => {
    fixture.detectChanges();
    expect(component.personForm).toBeInstanceOf(PersonForm);
    expect(component.personForm.value.id).toBeNull();
  });

  it('should create an instance of personForm with an existing person', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    expect(component.personForm).toBeInstanceOf(PersonForm);
    expect(component.personForm.value.id).toBe('Sfeir');
  });

  it('should emit the event save when the method onSave is called', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    const spyOnSaveEmitter = jest.spyOn(component.save, 'emit');
    component.onSave();
    expect(spyOnSaveEmitter).toHaveBeenCalledTimes(1);
    expect(spyOnSaveEmitter).toHaveBeenCalledWith(component.personForm.value);
  });

  it('should emit the event cancel when the method onCancel is called', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    const spyOnCancelEmitter = jest.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(spyOnCancelEmitter).toHaveBeenCalledTimes(1);
  });
});
