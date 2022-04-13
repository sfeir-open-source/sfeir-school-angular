import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [MatCardModule, MatToolbarModule],
})
export class MaterialDesignModule {}
