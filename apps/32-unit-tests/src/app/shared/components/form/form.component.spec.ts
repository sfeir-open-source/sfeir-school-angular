import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { People } from '../../models/people.model';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let fixture: ComponentFixture<FormComponent>;
  let component: FormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

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
    /**TODO:
     * Vérifiez que la class PersonForm est bien instancié et que personForm.value.id est bien nulle
     */
  });

  it('should create an instance of personForm with an existing person', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    /**TODO:
     * Vérifiez que la class PersonForm est bien instancié et que personForm.value.id est bien égale à 'Sfeir'
     */
  });

  it('should emit the event save when the method onSave is called', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const spyOnSaveEmitter = jest.spyOn(component.save, 'emit');
    /**TODO:
     * 1: Appelez la méthode onSave du composant
     * 2. Vérifiez que votre spy a été appelé une seule fois
     * 3. Vérifiez que votre spy a été appelé avec la valeur de personForm.value de votre composant
     */
  });

  it('should emit the event cancel when the method onCancel is called', () => {
    component.person = { id: 'Sfeir' } as People;
    fixture.detectChanges();
    const spyOnCancelEmitter = jest.spyOn(component.cancel, 'emit');
    /**TODO:
     * 1: Appelez la méthode onCancel du composant
     * 2. Vérifiez que votre spy a été appelé une seule fois
     */
    component.onCancel();
    expect(spyOnCancelEmitter).toHaveBeenCalledTimes(1);
  });
});
