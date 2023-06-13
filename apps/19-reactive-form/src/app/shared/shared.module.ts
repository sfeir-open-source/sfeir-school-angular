import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { BadgeDirective } from './directives/badge.directive';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  imports: [MaterialDesignModule, CommonModule, FormsModule, RouterModule, NgOptimizedImage],
  exports: [MaterialDesignModule, CardComponent, BadgeDirective, FormComponent, NgOptimizedImage],
  declarations: [CardComponent, NaPipe, BadgeDirective, FormComponent],
})
export class SharedModule {}
