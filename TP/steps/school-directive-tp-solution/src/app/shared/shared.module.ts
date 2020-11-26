import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardTitleDirective } from './components/card/card-title.directive';
import { CardSubtitleDirective } from './components/card/card-subtitle.directive';
import { CardContentDirective } from './components/card/card-content.directive';
import { CardFooterDirective } from './components/card/card-footer.directive';

@NgModule({
  declarations: [CardComponent, CardTitleDirective, CardSubtitleDirective, CardContentDirective, CardFooterDirective],
  exports: [CardComponent, CardTitleDirective, CardSubtitleDirective, CardContentDirective, CardFooterDirective],
  imports: [CommonModule]
})
export class SharedModule {}
