import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpsertPersonBody } from '@sfeir/types';
import { SignalForm } from '@sfeir/ui/signal-form';

@Component({
  templateUrl: './dialog-person.html',
  styleUrl: './dialog-person.scss',
  imports: [SignalForm],
})
export class DialogPerson {
  private readonly _dialogRef = inject(MatDialogRef<DialogPerson, UpsertPersonBody | undefined>);

  closeDialog(formValue?: UpsertPersonBody): void {
    this._dialogRef.close(formValue);
  }
}
