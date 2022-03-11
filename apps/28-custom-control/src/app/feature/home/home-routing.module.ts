import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const HOME_ROUTE: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTE)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
