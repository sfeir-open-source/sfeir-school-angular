import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { BadgeDirective } from './directives/badge.directive';
import { DisplayDirective } from './directives/display.directive';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  imports: [MaterialDesignModule, CommonModule, ReactiveFormsModule, RouterModule, NgOptimizedImage],
  exports: [MaterialDesignModule, CardComponent, BadgeDirective, FormComponent, CommonModule, ReactiveFormsModule, NgOptimizedImage],
  declarations: [CardComponent, NaPipe, BadgeDirective, FormComponent, DisplayDirective],
})
export class SharedModule {}
