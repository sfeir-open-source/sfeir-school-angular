import { Component, computed, input, model, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormValueControl, ValidationError } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'sfeir-input',
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormField],
})
export class CustomInput implements FormValueControl<string> {
  public readonly value = model<string>('');
  public readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  public readonly touched = input<boolean>(false);
  public readonly invalid = input<boolean>(false);
  public readonly placeholder = input<string>('');
  public readonly type = input<string>('text');
  public readonly touch = output<void>();

  protected readonly _fieldControl = form<string>(this.value);
  protected readonly _errorMatcher = computed(() => ({
    isErrorState: () => this.invalid() && this.touched(),
  }));

  handleBlur(): void {
    this.touch.emit();
  }
}
