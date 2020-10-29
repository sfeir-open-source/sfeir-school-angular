import { Component, ElementRef, forwardRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sfeir-input',
  templateUrl: 'custom-input.component.html',
  styleUrls: ['custom-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirInputComponent), multi: true }]
})
export class SfeirInputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @ViewChild('InputElement', { static: true }) inputElement: ElementRef;
  private onChange: (x: string) => void;
  constructor(private readonly renderer: Renderer2) {
    this.placeholder = this.placeholder ?? '';
  }

  writeValue(value: string) {
    this.renderer.setProperty(this.inputElement.nativeElement, 'value', value ?? null);
  }

  changeValue(value: string, event: KeyboardEvent) {
    if (event.code.toUpperCase() === 'TAB') {
      return null;
    }
    this.onChange(value);
  }

  loseFocus(value: string) {
    this.onChange(value);
  }

  registerOnTouched() {}

  registerOnChange(fn: (x: string) => void) {
    this.onChange = fn;
  }
}
