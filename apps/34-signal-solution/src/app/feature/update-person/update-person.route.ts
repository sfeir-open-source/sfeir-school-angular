import { personDetailsResolver } from './guards/person-details.resolver';
import { updateGuard } from './guards/update.guard';
import { UpdatePersonComponent } from './update-person.component';

export default [
  {
    path: '',
    component: UpdatePersonComponent,
    canActivate: [updateGuard],
    resolve: { personDetails: personDetailsResolver },
  },
];
