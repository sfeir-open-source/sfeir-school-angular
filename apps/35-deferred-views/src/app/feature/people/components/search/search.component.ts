import { Component, effect, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sfeir-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [MatInputModule, ReactiveFormsModule],
})
export class SearchComponent {
  searchControl: FormControl<string | null> = new FormControl(null);

  searchText = input<string>('');
  search = outputFromObservable(this.searchControl.valueChanges);

  #updateSearchControlEffect = effect(() => {
    this.searchControl.patchValue(this.searchText(), { emitEvent: false });
  });
}
