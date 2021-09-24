import { Component, OnInit, Input } from '@angular/core';
import { People } from '../../people.model';

@Component({
  selector: 'sfeir-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() person: People;

  constructor() {}

  /**
   * OnInit implementation
   */
  ngOnInit() {}
}
