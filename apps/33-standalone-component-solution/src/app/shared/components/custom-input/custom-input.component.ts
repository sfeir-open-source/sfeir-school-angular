import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Subject, takeUntil, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe, MatFormFieldModule, MatInputModule],
  selector: 'sfeir-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInputComponent), multi: true }],
})
export class CustomInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @ViewChild('InputElement', { static: true }) inputElement: ElementRef<HTMLInputElement>;
  userLoseFocus$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _onChange: (x: string | number) => void;
  private _onTouched: () => void;
  private unsubscribe$: Subject<boolean> = new Subject();

  constructor(private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    const inputListener$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      tap(() => {
        this._onChange(this.inputElement.nativeElement.value);
        this._onTouched();
      }),
    );

    const blurListener$ = fromEvent(this.inputElement.nativeElement, 'blur').pipe(
      tap(() => {
        this._onTouched();
        this.userLoseFocus$.next(true);
      }),
    );

    merge(inputListener$, blurListener$).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  writeValue(value: string | number): void {
    this.renderer.setProperty(this.inputElement.nativeElement, 'value', value ?? null);
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  registerOnChange(fn: (x: string | number) => void) {
    this._onChange = fn;
  }
}
