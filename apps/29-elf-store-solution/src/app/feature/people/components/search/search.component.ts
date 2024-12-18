import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sfeir-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
  @Input() searchText: string;
  @Output() search: EventEmitter<string> = new EventEmitter();
  searchControl: FormControl<string | null> = new FormControl('');
  private unsubscribe$: Subject<boolean> = new Subject();

  ngOnChanges() {
    this.searchControl.patchValue(this.searchText, { emitEvent: false });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(search => this.search.emit(search));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
