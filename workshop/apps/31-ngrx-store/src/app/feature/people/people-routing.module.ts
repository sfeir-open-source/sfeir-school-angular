import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';

const PEOPLE_ROUTE: Routes = [{ path: '', component: PeopleComponent }];

@NgModule({
  imports: [RouterModule.forChild(PEOPLE_ROUTE)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
