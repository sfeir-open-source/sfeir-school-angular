import { Component, forwardRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sfeir-input',
  templateUrl: 'custom-input.component.html',
  styleUrls: ['custom-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirInputComponent), multi: true }]
})
export class SfeirInputComponent implements ControlValueAccessor {
  private onChanged: (x: string) => void;
  private onTouched: () => void;
  @ViewChild('InputElement', { static: false }) inputElement: ElementRef;
  constructor(private readonly renderer: Renderer2) {}

  writeValue() {}

  registerOnTouched(fn: () => void) {}

  registerOnChange(fn: (inputValue: string) => void) {}
}
