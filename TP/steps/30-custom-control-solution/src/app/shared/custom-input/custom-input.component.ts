import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'sfeir-input',
  templateUrl: 'custom-input.component.html',
  styleUrls: ['custom-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirInputComponent), multi: true }]
})
export class SfeirInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string;
  @ViewChild('InputElement', { static: true }) inputElement: ElementRef;
  userFocus$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private onChange: (x: string) => void;
  private onTouched: () => void;
  private unsubscribe$: Subject<boolean> = new Subject();

  constructor(private readonly renderer: Renderer2) {
    this.placeholder = this.placeholder ?? '';
  }

  ngOnInit(): void {
    const inputListener$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      tap(() => {
        this.onChange(this.inputElement.nativeElement.value);
        this.onTouched();
      })
    );

    const blurListener$ = fromEvent(this.inputElement.nativeElement, 'blur').pipe(tap(() => this.onTouched()));

    const focusListener$ = fromEvent(this.inputElement.nativeElement, 'focus').pipe(
      tap(() => this.userFocus$.next(true))
    );

    merge(inputListener$, blurListener$, focusListener$)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  writeValue(value: string) {
    this.renderer.setProperty(this.inputElement.nativeElement, 'value', value ?? null);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  registerOnChange(fn: (x: string) => void) {
    this.onChange = fn;
  }
}
