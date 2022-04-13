import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { MaterialDesignModule } from './material-design.module';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  imports: [MaterialDesignModule, CommonModule],
  exports: [MaterialDesignModule, CardComponent],
  declarations: [CardComponent, NaPipe],
})
export class SharedModule {}
