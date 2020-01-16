import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SecretComponent } from './secret.component';

const secretRoutes: Routes = [{ path: '', component: SecretComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(secretRoutes)],
  declarations: [SecretComponent]
})
export class SecretModule {}
