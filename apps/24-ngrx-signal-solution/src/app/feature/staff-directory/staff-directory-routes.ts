import { Routes } from '@angular/router';
import { authenticatedGuard } from '../../core/guards/authenticated';
import { PersonDetails } from './person-details/person-details';
import { PersonDetailsResolver } from './resolvers';
import { StaffDirectory } from './staff-directory';
import { StaffDirectoryStore } from './staff-directory-store';

export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    providers: [StaffDirectoryStore],
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails, resolve: { person: PersonDetailsResolver } },
    ],
  },
];
