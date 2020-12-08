import { Component, ContentChild } from '@angular/core';
import { CardTitleDirective } from './card-title.directive';
import { CardSubtitleDirective } from './card-subtitle.directive';
import { CardContentDirective } from './card-content.directive';
import { CardFooterDirective } from './card-footer.directive';

@Component({
  selector: 'sfeir-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent {
  @ContentChild(CardTitleDirective) cardTitle: CardTitleDirective;
  @ContentChild(CardSubtitleDirective) cardSubtitle: CardSubtitleDirective;
  @ContentChild(CardContentDirective) cardContent: CardContentDirective;
  @ContentChild(CardFooterDirective) cardFooter: CardFooterDirective;

  constructor() {}
}
