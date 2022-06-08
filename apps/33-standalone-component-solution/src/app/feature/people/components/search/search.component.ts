import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'sfeir-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SearchComponent implements OnChanges, OnInit {
  @Input() searchText: string;
  @Output() search: EventEmitter<string> = new EventEmitter();
  searchControl: UntypedFormControl;
  private unsubscribe$: Subject<boolean> = new Subject();

  ngOnChanges() {
    this.searchControl
      ? this.searchControl.patchValue(this.searchText, { emitEvent: false })
      : (this.searchControl = new UntypedFormControl(this.searchText));
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(search => this.search.emit(search));
  }
}
