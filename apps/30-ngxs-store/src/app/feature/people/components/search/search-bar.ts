import { Component, effect, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';
import { SfeirCustomInput } from '../../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'sfeir-search-bar',
  template: ` <section class="search-person">
    <sfeir-custom-input inputPlaceholder="Search Person" inputType="text" [formControl]="searchControl" />
  </section>`,
  styles: `
    .search-person {
      width: 100%;
      display: flex;
      justify-content: center;

      sfeir-custom-input {
        width: 70%;
      }
    }
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, SfeirCustomInput],
})
export class SearchBar {
  initialSearch = input.required<string>();
  searchControl = new FormControl<string | null>(null);
  search = outputFromObservable(this.searchControl.valueChanges.pipe(debounceTime(300)));

  constructor() {
    effect(() => {
      this.searchControl.setValue(this.initialSearch());
    });
  }
}
