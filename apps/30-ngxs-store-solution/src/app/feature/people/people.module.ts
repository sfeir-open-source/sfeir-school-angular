import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [PeopleComponent, AddPersonDialogComponent, SearchComponent],
  imports: [SharedModule, PeopleRoutingModule],
})
export class PeopleModule {}
