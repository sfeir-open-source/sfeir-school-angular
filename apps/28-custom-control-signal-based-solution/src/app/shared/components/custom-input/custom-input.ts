import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { disabled, form, FormField, FormValueControl, ValidationError } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'sfeir-custom-input',
  template: `
    <mat-form-field appearance="outline" subscriptSizing="dynamic" [class.mat-form-field-invalid]="invalid() && touched()">
      <mat-label>{{ inputPlaceholder() }}</mat-label>
      <input matInput [type]="inputType()" [placeholder]="inputPlaceholder()" (blur)="touch.emit()" [formField]="inputField" />
    </mat-form-field>

    @if (invalid() && touched()) {
      @for (error of errors(); track error.kind) {
        <mat-error>{{ error.message }}</mat-error>
      }
    }
  `,
  styles: `
    :host {
      width: 100%;
      mat-form-field {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, FormField],
})
export class SfeirCustomInput implements FormValueControl<string> {
  value = model<string>('');
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  invalid = input<boolean>(false);
  disabled = input<boolean>(false);
  touched = input<boolean>(false);
  touch = output<void>();
  inputPlaceholder = input<string>();
  inputType = input<string>();

  inputField = form<string>(this.value, inputField => {
    disabled(inputField, this.disabled);
  });
}
