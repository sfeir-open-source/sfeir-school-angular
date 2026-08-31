import { KeyValuePipe } from '@angular/common';
import { Component, computed, DestroyRef, forwardRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  minlength: 'This field must be at least 2 characters long',
  pattern: 'This field must match the pattern',
  email: 'This field must be a valid email address',
  phone: 'This field must be a valid phone number',
  sfeirEmail: 'This field must be a valid Sfeir email address',
};

@Component({
  selector: 'sfeir-input',
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, KeyValuePipe],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInput), multi: true }],
})
export class CustomInput implements ControlValueAccessor {
  private readonly _destroyRef = inject(DestroyRef);
  private _onChanged: (value: string) => void = () => void 0;
  private _onTouched: () => void = () => void 0;
  protected readonly _mapErrorMessage = ERROR_MESSAGES;

  public readonly placeholder = input<string>('');
  public readonly type = input<string>('text');
  public readonly errors = input.required<ValidationErrors | null>();

  protected readonly _control = new FormControl<string>('', { nonNullable: true });
  protected readonly _errorMatcher = computed(() => ({
    isErrorState: (control: AbstractControl<string>) => {
      return (control.touched || control.dirty) && !!this.errors();
    },
  }));

  constructor() {
    this._control.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this._onChanged(value);
      this._onTouched();
    });
  }

  writeValue(value: string): void {
    if (value) {
      this._control.setValue(value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      return this._control.disable({ emitEvent: false });
    }
    return this._control.enable({ emitEvent: false });
  }

  handleBlur(): void {
    this._onTouched();
  }
}
