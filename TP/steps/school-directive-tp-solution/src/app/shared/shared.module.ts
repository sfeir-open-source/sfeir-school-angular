import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardTitleDirective } from './components/card/card-title.directive';
import { CardSubtitleDirective } from './components/card/card-subtitle.directive';
import { CardContentDirective } from './components/card/card-content.directive';
import { CardFooterDirective } from './components/card/card-footer.directive';
import { DragAndDropDirective } from './directives/drag-and-drop/drag-and-drop.directive';
import { SecretDirective } from './directives/secret/secret.directive';
import { IconSecretComponent } from './directives/secret/icon-secret/icon-secret.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CardComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardContentDirective,
    CardFooterDirective,
    DragAndDropDirective,
    SecretDirective,
    IconSecretComponent
  ],
  exports: [
    MatInputModule,
    CardComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardContentDirective,
    CardFooterDirective,
    DragAndDropDirective,
    SecretDirective
  ],
  entryComponents: [IconSecretComponent],
  imports: [CommonModule]
})
export class SharedModule {}
