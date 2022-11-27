import { PersonDetailsResolver } from './guards/person-details.resolver';
import { UpdateGuard } from './guards/update.guard';
import { UpdatePersonComponent } from './update-person.component';

export default [
  {
    path: '',
    component: UpdatePersonComponent,
    providers: [UpdateGuard, PersonDetailsResolver],
    canActivate: [UpdateGuard],
    resolve: { personDetails: PersonDetailsResolver },
  },
];
