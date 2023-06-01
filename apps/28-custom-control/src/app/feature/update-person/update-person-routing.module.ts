import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePersonComponent } from './update-person.component';
import { updateGuard } from './guards/update.guard';
import { personDetailsResolver } from './guards/person-details.resolver';

const UPDATE_PERSON_ROUTES: Routes = [
  {
    path: '',
    component: UpdatePersonComponent,
    canActivate: [updateGuard],
    resolve: {
      personDetails: personDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(UPDATE_PERSON_ROUTES)],
  exports: [RouterModule],
})
export class UpdatePersonRoutingModule {}
