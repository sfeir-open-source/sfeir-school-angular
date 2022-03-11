import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PersonDetailsResolver } from './guards/person-details.resolver';
import { UpdateGuard } from './guards/update.guard';
import { UpdatePersonRoutingModule } from './update-person-routing.module';
import { UpdatePersonComponent } from './update-person.component';

@NgModule({
  declarations: [UpdatePersonComponent],
  providers: [UpdateGuard, PersonDetailsResolver],
  imports: [SharedModule, UpdatePersonRoutingModule],
})
export class UpdatePersonModule {}
