import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: async () => await import('./feature/home/home.module') },
  { path: 'people', loadChildren: async () => await import('./feature/people/people.module') },
  { path: 'people/:id', loadChildren: async () => await import('./feature/update-person/update-person.module') },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
