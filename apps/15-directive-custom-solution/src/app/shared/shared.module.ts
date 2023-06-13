import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';
import { BadgeDirective } from './directives/badge.directive';

@NgModule({
  imports: [MaterialDesignModule, CommonModule, NgOptimizedImage],
  exports: [MaterialDesignModule, NgOptimizedImage, CardComponent, BadgeDirective],
  declarations: [CardComponent, NaPipe, BadgeDirective],
})
export class SharedModule {}
