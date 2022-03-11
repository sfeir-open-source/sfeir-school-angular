import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsResolver } from './guards/person-details.resolver';
import { UpdateGuard } from './guards/update.guard';
import { UpdatePersonComponent } from './update-person.component';

const UPDATE_ROUTES: Routes = [
  {
    path: '',
    component: UpdatePersonComponent,
    canActivate: [UpdateGuard],
    resolve: { personDetails: PersonDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(UPDATE_ROUTES)],
  exports: [RouterModule],
})
export class UpdatePersonRoutingModule {}
