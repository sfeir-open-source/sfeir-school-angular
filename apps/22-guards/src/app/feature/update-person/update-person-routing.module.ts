import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePersonComponent } from './update-person.component';

const UPDATE_PERSON_ROUTES: Routes = [{ path: '', component: UpdatePersonComponent }];

@NgModule({
  imports: [RouterModule.forChild(UPDATE_PERSON_ROUTES)],
  exports: [RouterModule],
})
export class UpdatePersonRoutingModule {}
