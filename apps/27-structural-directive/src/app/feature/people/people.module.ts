import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

@NgModule({
  imports: [PeopleRoutingModule, SharedModule],
  exports: [],
  declarations: [PeopleComponent, AddPersonDialogComponent],
  providers: [],
})
export default class PeopleModule {}
