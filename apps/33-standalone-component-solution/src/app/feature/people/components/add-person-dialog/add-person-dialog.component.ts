import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeopleForm } from '../../../../shared/models/people.model';
import { FormComponent } from '../../../../shared/components/form/form.component';

@Component({
  selector: 'sfeir-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss'],
  standalone: true,
  imports: [FormComponent],
})
export class AddPersonDialogComponent {
  private readonly dialogRef: MatDialogRef<AddPersonDialogComponent> = inject(MatDialogRef);

  closeDialog(person: PeopleForm = null): void {
    this.dialogRef.close(person);
  }
}
