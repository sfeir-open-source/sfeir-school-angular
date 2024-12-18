import { afterNextRender, Component, ElementRef, forwardRef, input, OnDestroy, Renderer2, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Subject, takeUntil, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatFormFieldModule, MatInputModule],
  selector: 'sfeir-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInputComponent), multi: true }],
})
export class CustomInputComponent implements OnDestroy, ControlValueAccessor {
  placeholder = input<string>('');
  inputType = input<string>('text');
  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('InputElement');
  userLoseFocus$ = signal<boolean>(false);

  private _onChange: (x: string | number) => void;
  private _onTouched: () => void;
  private unsubscribe$: Subject<boolean> = new Subject();

  #listener = afterNextRender({
    read: () => {
      const inputListener$ = fromEvent(this.inputElement().nativeElement, 'input').pipe(
        tap(() => {
          this._onChange(this.inputElement().nativeElement.value);
          this._onTouched();
        }),
      );
      const blurListener$ = fromEvent(this.inputElement().nativeElement, 'blur').pipe(
        tap(() => {
          this._onTouched();
          this.userLoseFocus$.set(true);
        }),
      );
      merge(inputListener$, blurListener$).pipe(takeUntil(this.unsubscribe$)).subscribe();
    },
  });

  constructor(private readonly renderer: Renderer2) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  writeValue(value: string | number): void {
    this.renderer.setProperty(this.inputElement().nativeElement, 'value', value ?? null);
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  registerOnChange(fn: (x: string | number) => void) {
    this._onChange = fn;
  }
}
