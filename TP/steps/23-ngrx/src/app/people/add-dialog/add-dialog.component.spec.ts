import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddDialogComponent } from './add-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

class MatDialogRefMock {
  close() {}
}
describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatDialogModule],
        declarations: [AddDialogComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: MatDialogRef, useClass: MatDialogRefMock }]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    spyOn(component, 'closeDialog');
    component.onCancel();

    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should close dialog and pass person value', () => {
    const person = { id: '1234' };
    spyOn(component, 'closeDialog');
    component.onSave(person);
    expect(component.closeDialog).toHaveBeenCalledWith(person);
  });

  it('closeDialog should call closing service of dialog', inject([MatDialogRef], dialogRef => {
    const result = 'ABC';
    spyOn(dialogRef, 'close');
    component.closeDialog(result);
    expect(dialogRef.close).toHaveBeenCalledWith(result);
  }));
});
