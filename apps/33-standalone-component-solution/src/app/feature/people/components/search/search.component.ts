import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'sfeir-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [MatInputModule, ReactiveFormsModule],
})
export class SearchComponent implements OnChanges, OnInit {
  @Input() searchText: string;
  @Output() search: EventEmitter<string> = new EventEmitter();
  searchControl: FormControl<string | null>;
  private unsubscribe$: Subject<boolean> = new Subject();

  ngOnChanges() {
    this.searchControl
      ? this.searchControl.patchValue(this.searchText, { emitEvent: false })
      : (this.searchControl = new FormControl(this.searchText));
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(search => this.search.emit(search));
  }
}
