import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { BadgeDirective } from './directives/badge.directive';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  imports: [MaterialDesignModule, CommonModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, MaterialDesignModule, CardComponent, BadgeDirective, FormComponent],
  declarations: [CardComponent, NaPipe, BadgeDirective, FormComponent],
})
export class SharedModule {}
