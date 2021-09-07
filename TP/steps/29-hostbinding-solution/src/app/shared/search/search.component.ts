import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sfeir-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent {
  @Input() initValue: string;
  @Output('search') searchEvent: EventEmitter<string>;
  @Output('selectOnEnter') selectEvent: EventEmitter<string>;
  @Output('current') currentEvent: EventEmitter<number>;

  constructor() {
    this.searchEvent = new EventEmitter<string>();
    this.selectEvent = new EventEmitter<string>();
    this.currentEvent = new EventEmitter<number>();
  }

  search(value: string) {
    this.searchEvent.emit(value);
  }

  onSelect() {
    this.selectEvent.emit();
  }

  next() {
    this.currentEvent.emit(1);
  }

  prev() {
    this.currentEvent.emit(-1);
  }
}
