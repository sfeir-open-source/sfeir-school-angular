import { Routes } from '@angular/router';
import { StaffDirectory } from './staff-directory';
import { PersonDetails } from './person-details/person-details';

export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails },
    ],
  },
];
