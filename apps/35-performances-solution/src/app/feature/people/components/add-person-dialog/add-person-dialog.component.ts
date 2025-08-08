import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeopleForm } from '../../../../shared/models/people.model';
import { Form } from '../../../../shared/components/form/form';

@Component({
  selector: 'sfeir-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss'],
  imports: [Form],
})
export class AddPersonDialogComponent {
  private readonly dialogRef: MatDialogRef<AddPersonDialogComponent> = inject(MatDialogRef);

  closeDialog(person: PeopleForm = null): void {
    this.dialogRef.close(person);
  }
}
