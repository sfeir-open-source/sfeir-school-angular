import { Component, DestroyRef, effect, forwardRef, inject, input, signal, Type } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const provideControlValueAccessor = <T>(component: Type<T>) => {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
};

@Component({
  selector: 'sfeir-custom-input',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ inputPlaceholder() }}</mat-label>
      <input matInput [type]="inputType()" [placeholder]="inputPlaceholder()" [formControl]="inputValue" (blur)="markInputAsBlur()" />
      @if (hasLooseFocus()) {
        <ng-content />
      }
    </mat-form-field>
  `,
  styles: `
    :host {
      width: 100%;

      mat-form-field {
        width: 100%;
      }
    }
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  providers: [provideControlValueAccessor(SfeirCustomInput)],
})
export class SfeirCustomInput implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private _onChanged: (value: string) => void = void 0;
  private _onTouched: () => void = void 0;

  inputPlaceholder = input.required<string>();
  inputType = input.required<string>();

  inputValue = new FormControl<string | null>(null);
  hasLooseFocus = signal(false);

  constructor() {
    effect(() => {
      this.inputValue.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
        this._onChanged(value);
        this._onTouched();
      });
    });
  }

  writeValue(value: string): void {
    this.inputValue.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (x: string) => void): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputValue.disable({ emitEvent: false });
    } else {
      this.inputValue.enable({ emitEvent: false });
    }
  }

  markInputAsBlur(): void {
    this.hasLooseFocus.set(true);
    this._onTouched();
  }
}
