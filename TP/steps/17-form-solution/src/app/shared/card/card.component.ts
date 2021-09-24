import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { People } from '../../people.model';

@Component({
  selector: 'sfeir-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() person: People;
  @Output('personDelete') delete: EventEmitter<any>;

  constructor() {
    this.delete = new EventEmitter();
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}
}
