import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: async () => (await import('./feature/home/home.module')).HomeModule },
  { path: 'people', loadChildren: async () => (await import('./feature/people/people.module')).PeopleModule },
  {
    path: 'people/:id',
    loadChildren: async () => (await import('./feature/update-person/update-person.module')).UpdatePersonModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
