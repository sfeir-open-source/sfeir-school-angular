import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { MaterialDesignModule } from './material-design.module';

@NgModule({
  imports: [MaterialDesignModule, NgOptimizedImage],
  exports: [MaterialDesignModule, CardComponent],
  declarations: [CardComponent],
})
export class SharedModule {}
