import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() person: any;
  @Output('personDelete') delete$: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  /**
   * Function to emit event to delete current person
   *
   */
  delete(person: any) {
    this.delete$.emit(person);
  }
}
