import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardTitleDirective } from './components/card/card-title.directive';
import { CardSubtitleDirective } from './components/card/card-subtitle.directive';
import { CardContentDirective } from './components/card/card-content.directive';
import { CardFooterDirective } from './components/card/card-footer.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';

@NgModule({
  declarations: [
    CardComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardContentDirective,
    CardFooterDirective,
    DragAndDropDirective
  ],
  exports: [
    CardComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardContentDirective,
    CardFooterDirective,
    DragAndDropDirective
  ],
  imports: [CommonModule]
})
export class SharedModule {}
