import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { BadgeDirective } from './directives/badge.directive';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  imports: [MaterialDesignModule, CommonModule, FormsModule, NgOptimizedImage],
  exports: [MaterialDesignModule, NgOptimizedImage, CardComponent, BadgeDirective, FormComponent],
  declarations: [CardComponent, NaPipe, BadgeDirective, FormComponent],
})
export class SharedModule {}
